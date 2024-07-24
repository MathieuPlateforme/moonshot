use std::env;

use env_logger::{Builder, Env};

pub fn init_logging() {
    let env = Env::default().filter_or("RUST_LOG", "info");
    Builder::from_env(env).init();
}

pub fn server_address() -> String {
    let server_ip = env::var("SERVER_IP").unwrap_or_else(|_| "0.0.0.0".to_string());
    let server_port = env::var("SERVER_PORT").unwrap_or_else(|_| "8000".to_string());
    format!("{}:{}", server_ip, server_port)
}
