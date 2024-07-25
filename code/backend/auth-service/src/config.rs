use dotenv::dotenv;
use std::env;

pub fn init() {
    dotenv().ok();
    // TODO: Charger les configurations nécessaires, comme les secrets JWT
}