use actix_web::web;
use crate::handlers::{login_user, refresh_token, health_check};

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::resource("/login")
            .route(web::post().to(login_user))
    )
        .service(
            web::resource("/refresh")
                .route(web::post().to(refresh_token))
        )
        .service(
            web::resource("/health")
                .route(web::get().to(health_check))
        );
}

