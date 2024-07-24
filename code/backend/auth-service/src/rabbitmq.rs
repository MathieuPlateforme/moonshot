use std::env;
use std::sync::Arc;
use futures_util::stream::StreamExt;
use bcrypt::{hash, DEFAULT_COST};
use lapin::{Channel, Connection, ConnectionProperties, ExchangeKind, options::*, types::FieldTable, BasicProperties};
use lapin::message::Delivery;
use mongodb::bson::doc;
use mongodb::Client;
use serde::{Deserialize, Serialize};
use tokio_amqp::LapinTokioExt;
use tokio::time::{sleep, Duration};
use crate::models::User;

pub const EXCHANGE_NAME: &str = "user_exchange";
pub const QUEUE_NAME: &str = "user_operations";
pub const ROUTING_KEY_USER_CREATED: &str = "user.created";
pub const ROUTING_KEY_USER_UPDATED: &str = "user.updated";
pub const ROUTING_KEY_USER_DELETED: &str = "user.deleted";

#[derive(Debug, Serialize, Deserialize, Clone)]
struct UserData {
    user_id: String,
    username: String,
    password: String,
    email: String,
    role: String,
}

pub async fn create_rabbitmq_channel() -> Channel {
    let rabbitmq_uri = env::var("RABBITMQ_URI").expect("RABBITMQ_URI must be set");
    println!("Attempting to connect to RabbitMQ at: {}", rabbitmq_uri);

    for _ in 0..10 {
        match Connection::connect(&rabbitmq_uri, ConnectionProperties::default().with_tokio()).await {
            Ok(conn) => {
                println!("Connected to RabbitMQ");
                return conn.create_channel().await.expect("Failed to create channel");
            }
            Err(err) => {
                eprintln!("Failed to connect to RabbitMQ: {}", err);
                sleep(Duration::from_secs(10)).await; // Augmenter le délai entre les tentatives
            }
        }
    }
    panic!("Failed to connect to RabbitMQ after several attempts");
}

pub async fn setup_rabbitmq(channel: &Channel) {
    let exchange_name = EXCHANGE_NAME;
    channel.exchange_declare(
        exchange_name,
        ExchangeKind::Direct,
        ExchangeDeclareOptions::default(),
        FieldTable::default(),
    ).await.expect("Failed to declare exchange");

    let queue_name = QUEUE_NAME;
    channel.queue_declare(
        queue_name,
        QueueDeclareOptions::default(),
        FieldTable::default(),
    ).await.expect("Failed to declare queue");

    let routing_keys = vec![ROUTING_KEY_USER_CREATED, ROUTING_KEY_USER_UPDATED, ROUTING_KEY_USER_DELETED];
    for routing_key in &routing_keys {
        channel.queue_bind(
            queue_name,
            exchange_name,
            routing_key,
            QueueBindOptions::default(),
            FieldTable::default(),
        ).await.expect("Failed to bind queue");
    }
}

pub async fn consume_messages(channel: Channel, client: Arc<Client>) {
    setup_rabbitmq(&channel).await;

    let mut consumer = channel
        .basic_consume(
            QUEUE_NAME,
            "auth_service_consumer",
            BasicConsumeOptions::default(),
            FieldTable::default(),
        )
        .await
        .expect("Failed to start consumer");

    while let Some(delivery) = consumer.next().await {
        match delivery {
            Ok(delivery) => {
                handle_message(channel.clone(), delivery, Arc::clone(&client)).await;
            }
            Err(error) => {
                eprintln!("Failed to consume message: {}", error);
            }
        }
    }
}

async fn handle_message(channel: Channel, delivery: Delivery, client: Arc<Client>) {
    let mut data: UserData = serde_json::from_slice(&delivery.data).expect("Failed to deserialize message");

    // Hachez le mot de passe avant de l'insérer
    let hashed_password = hash(&data.password, DEFAULT_COST).expect("Failed to hash password");

    // Créez une structure User avec le mot de passe haché
    let user = User {
        id: None,
        user_id: data.user_id,
        username: data.username,
        hashed_password,
        email: data.email,
        role: data.role,
        created_at: None,
        updated_at: None,
    };

    let collection = client.database("auth-service").collection("credentials");

    match delivery.routing_key.as_str() {
        ROUTING_KEY_USER_CREATED => {
            match collection.insert_one(user.clone()).await {
                Ok(_) => {
                    println!("User created: {:?}", user);
                    channel
                        .basic_ack(delivery.delivery_tag, BasicAckOptions::default())
                        .await
                        .expect("Failed to acknowledge message");
                }
                Err(error) => {
                    eprintln!("Failed to insert user: {}", error);
                }
            }
        }
        ROUTING_KEY_USER_UPDATED => {
            match collection.replace_one(doc! { "user_id": user.user_id.clone() }, user.clone()).await {
                Ok(_) => {
                    println!("User updated: {:?}", user);
                    channel
                        .basic_ack(delivery.delivery_tag, BasicAckOptions::default())
                        .await
                        .expect("Failed to acknowledge message");
                }
                Err(error) => {
                    eprintln!("Failed to update user: {}", error);
                }
            }
        }
        ROUTING_KEY_USER_DELETED => {
            match collection.delete_one(doc! { "user_id": user.user_id.clone() }).await {
                Ok(_) => {
                    println!("User deleted: {:?}", user);
                    channel
                        .basic_ack(delivery.delivery_tag, BasicAckOptions::default())
                        .await
                        .expect("Failed to acknowledge message");
                }
                Err(error) => {
                    eprintln!("Failed to delete user: {}", error);
                }
            }
        }
        _ => {
            eprintln!("Unknown routing key: {}", delivery.routing_key);
        }
    }
}