use std::env;

use lapin::{Channel, Connection, ConnectionProperties, ExchangeKind, options::*, types::FieldTable};

pub const EXCHANGE_NAME: &str = "user_exchange";
pub const QUEUE_NAME: &str = "user_operations";
pub const ROUTING_KEY_USER_CREATED: &str = "user.created";
pub const ROUTING_KEY_USER_UPDATED: &str = "user.updated";
pub const ROUTING_KEY_USER_DELETED: &str = "user.deleted";

pub async fn setup_rabbitmq() -> Result<Channel, lapin::Error> {
    let addr = env::var("RABBITMQ_ADDR").expect("RABBITMQ_ADDR must be set");
    let conn = Connection::connect(&*addr, ConnectionProperties::default()).await?;
    let channel = conn.create_channel().await?;

    let exchange_name = EXCHANGE_NAME;
    channel.exchange_declare(
        exchange_name,
        ExchangeKind::Direct,
        ExchangeDeclareOptions::default(),
        FieldTable::default(),
    ).await?;

    let queue_name = QUEUE_NAME;
    channel.queue_declare(
        queue_name,
        QueueDeclareOptions::default(),
        FieldTable::default(),
    ).await?;

    let routing_keys = vec![ROUTING_KEY_USER_CREATED, ROUTING_KEY_USER_UPDATED, ROUTING_KEY_USER_DELETED];
    for routing_key in &routing_keys {
        channel.queue_bind(
            queue_name,
            exchange_name,
            routing_key,
            QueueBindOptions::default(),
            FieldTable::default(),
        ).await?;
    }

    Ok(channel)
}
