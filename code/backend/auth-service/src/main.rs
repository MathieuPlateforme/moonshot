use actix_web::{web, App, HttpServer};
use mongodb::{Client, options::ClientOptions};
use dotenv::dotenv;
use std::env;
use std::sync::Arc;
use tokio;
use log::info;

mod handlers;
mod models;
mod routes;
mod services;
mod rabbitmq;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Starting auth-service");
    dotenv().ok();
    env_logger::init();

    let port = env::var("PORT").unwrap_or_else(|_| "8081".to_string());
    info!("Port: {}", port);

    let mongodb_uri = env::var("MONGODB_URI").expect("MONGODB_URI must be set");
    info!("MongoDB URI: {}", mongodb_uri);

    let client_options = ClientOptions::parse(&mongodb_uri).await.unwrap();
    let client = Client::with_options(client_options).unwrap();
    let client_arc = Arc::new(client);
    info!("Connected to MongoDB");

    let rabbitmq_channel = rabbitmq::create_rabbitmq_channel().await;
    let client_clone = Arc::clone(&client_arc);
    info!("Connected to RabbitMQ");

    tokio::spawn(async move {
        rabbitmq::consume_messages(rabbitmq_channel, client_clone).await;
    });

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(Arc::clone(&client_arc)))
            .configure(routes::init)
    })
        .bind(("0.0.0.0", port.parse().unwrap_or_else(|_| {
            eprintln!("Failed to parse port, using default port 8081");
            8081
        })))?
        .run()
        .await
}
