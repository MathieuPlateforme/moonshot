use actix_web::web;
use crate::handlers::{create_user, login_user, refresh_token};

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::resource("/register")
            .route(web::post().to(create_user))
    )
        .service(
            web::resource("/login")
                .route(web::post().to(login_user))
        )
        .service(
            web::resource("/refresh")
                .route(web::post().to(refresh_token))
        );
}

