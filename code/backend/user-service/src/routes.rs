use actix_web::web;

use crate::handlers::{create_address, create_user, delete_address, delete_user, get_address, get_all_addresses, get_all_users, get_user, health_check, update_address, update_user};

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::resource("/health")
            .route(web::get().to(health_check))
    )
    .service(
        web::resource("/users")
            .route(web::post().to(create_user))
            .route(web::get().to(get_all_users))
    )
    .service(
        web::resource("/users/{id}")
            .route(web::get().to(get_user))
            .route(web::put().to(update_user))
            .route(web::delete().to(delete_user))
    )
    .service(
        web::resource("/addresses")
            .route(web::post().to(create_address))
            .route(web::get().to(get_all_addresses))
    )
    .service(
        web::resource("/addresses/{id}")
            .route(web::get().to(get_address))
            .route(web::put().to(update_address))
            .route(web::delete().to(delete_address))
    );
}
