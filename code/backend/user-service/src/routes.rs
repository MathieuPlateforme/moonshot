use actix_web::web;

use crate::handlers::{create_user, delete_user, get_all_users, get_user, health_check, update_user};

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
    );
}
