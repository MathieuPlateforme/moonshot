use std::env;

use diesel::pg::PgConnection;
use diesel::prelude::*;
use dotenv::dotenv;

pub mod models;
pub mod schema;
pub mod dto;
pub mod mq;

pub fn establish_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}
