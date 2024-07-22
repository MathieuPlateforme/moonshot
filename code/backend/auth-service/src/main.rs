use actix_web::{web, App, HttpServer};
use mongodb::{Client, options::ClientOptions};
use dotenv::dotenv;
use std::env;

mod handlers;
mod models;
mod routes;
mod services;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Starting auth-service");
    dotenv().ok();
    let port = env::var("PORT").unwrap_or_else(|_| "8081".to_string());

    let mongodb_uri = env::var("MONGODB_URI").expect("MONGODB_URI must be set");
    let client_options = ClientOptions::parse(&mongodb_uri).await.unwrap();
    let client = Client::with_options(client_options).unwrap();

    println!("Connected to MongoDB: {}", mongodb_uri);
    println!("Listening on port: {}", port);

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(client.clone()))
            .configure(routes::init)
    })
        .bind(("0.0.0.0", port.parse().unwrap_or_else(|_| {
            eprintln!("Failed to parse port, using default port 8081");
            8081
        })))?
        .run()
        .await
}
