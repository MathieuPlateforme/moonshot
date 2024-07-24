use actix_web::{web, Responder, HttpResponse};
use std::time::Instant;
use serde::{Serialize, Deserialize};
use bcrypt::verify;
use chrono::{Utc, Duration};
use jsonwebtoken::{encode, decode, Header, EncodingKey, DecodingKey, Validation, TokenData, errors::Error as JwtError};
use crate::models::{User, Role};
use mongodb::{Client, bson::doc};
use std::env;
use std::sync::Arc;
use log::info;

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateUser {
    pub username: String,
    pub password: String,
    pub email: String,
    pub role: Role,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct LoginUser {
    pub username: String,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct AccessClaims {
    sub: String,
    role: String,
    exp: usize,
}

#[derive(Debug, Serialize, Deserialize)]
struct RefreshClaims {
    sub: String,
    username: String,
    role: String,
    exp: usize,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TokenRequest {
    pub access_token: String,
    pub refresh_token: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TokenResponse {
    pub access_token: String,
    pub refresh_token: String,
}

pub async fn health_check() -> impl Responder {
    HttpResponse::Ok().finish()
}

pub async fn refresh_token(client: web::Data<Arc<Client>>, token_request: web::Json<TokenRequest>) -> impl Responder {
    let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");

    let access_token_data: Result<TokenData<AccessClaims>, JwtError> = decode::<AccessClaims>(
        &token_request.access_token,
        &DecodingKey::from_secret(secret.as_ref()),
        &Validation::default(),
    );

    let refresh_token_data: Result<TokenData<RefreshClaims>, JwtError> = decode::<RefreshClaims>(
        &token_request.refresh_token,
        &DecodingKey::from_secret(secret.as_ref()),
        &Validation::default(),
    );

    if let (Ok(access_claims), Ok(refresh_claims)) = (access_token_data, refresh_token_data) {
        if access_claims.claims.sub == refresh_claims.claims.sub && refresh_claims.claims.exp > Utc::now().timestamp() as usize {
            let new_access_token = create_access_jwt(
                access_claims.claims.sub.clone(),
                &access_claims.claims.role,
                15, // 15 minutes for access token
            );
            let new_refresh_token = create_refresh_jwt(
                refresh_claims.claims.sub.clone(),
                &refresh_claims.claims.username,
                &refresh_claims.claims.role,
                30 * 24 * 60, // 1 month for refresh token
            );
            let token_response = TokenResponse {
                access_token: new_access_token,
                refresh_token: new_refresh_token,
            };
            return HttpResponse::Ok().json(token_response);
        }
    }

    HttpResponse::Unauthorized().finish()
}

pub async fn login_user(client: web::Data<Arc<Client>>, login_user: web::Json<LoginUser>) -> impl Responder {
    let start_time = Instant::now();
    info!("Starting login_user handler");

    let db = client.database("auth-service");
    let collection = db.collection::<User>("credentials");

    info!("Attempting to find user with username: {}", login_user.username);
    let user = match collection.find_one(doc! { "username": &login_user.username }).await {
        Ok(user) => user,
        Err(e) => {
            info!("Error finding user: {:?}", e);
            return HttpResponse::InternalServerError().finish();
        },
    };

    if let Some(user) = user {
        info!("User found: {:?}", user);
        match verify(&login_user.password, &user.hashed_password) {
            Ok(is_valid) => {
                if is_valid {
                    info!("Password verification succeeded");
                    let access_token = create_access_jwt(user.id.unwrap().to_string(), &user.role, 15); // 15 minutes pour access token
                    let refresh_token = create_refresh_jwt(user.id.unwrap().to_string(), &user.username, &user.role, 30 * 24 * 60); // 1 month for refresh token
                    let tokens = TokenResponse {
                        access_token,
                        refresh_token,
                    };
                    info!("Generated tokens: {:?}", tokens);
                    return HttpResponse::Ok().json(tokens);
                } else {
                    info!("Password verification failed");
                }
            }
            Err(e) => {
                info!("Error verifying password: {:?}", e);
                return HttpResponse::InternalServerError().finish();
            }
        }
    } else {
        info!("User not found");
    }

    HttpResponse::Unauthorized().finish()
}

fn create_access_jwt(user_id: String, role: &str,  expiration_minutes: i64) -> String {
    let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");

    let expiration = Utc::now()
        .checked_add_signed(Duration::minutes(expiration_minutes))
        .expect("valid timestamp")
        .timestamp() as usize;

    let claims = AccessClaims {
        sub: user_id,
        role: role.to_owned(),
        exp: expiration,
    };

    encode(&Header::default(), &claims, &EncodingKey::from_secret(secret.as_ref()))
        .unwrap_or_else(|_| "Error creating token".to_string())
}

fn create_refresh_jwt(user_id: String, username: &str, role: &str, expiration_minutes: i64) -> String {
    let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");

    let expiration = Utc::now()
        .checked_add_signed(Duration::minutes(expiration_minutes))
        .expect("valid timestamp")
        .timestamp() as usize;

    let claims = RefreshClaims {
        sub: user_id,
        username: username.to_owned(),
        role: role.to_owned(),
        exp: expiration,
    };

    encode(&Header::default(), &claims, &EncodingKey::from_secret(secret.as_ref()))
        .unwrap_or_else(|_| "Error creating token".to_string())
}