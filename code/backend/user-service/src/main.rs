use actix_web::{App, HttpServer};
use dotenv::dotenv;
use std::io::Result;
use actix_web::middleware::Logger;

mod config;
mod routes;
mod handlers;

#[actix_web::main]
async fn main() -> Result<()> {
    dotenv().ok();
    config::init_logging();
    let server_address = config::server_address();

    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default())
            .configure(routes::configure)
    })
    .bind(server_address)?
    .run()
    .await
}
