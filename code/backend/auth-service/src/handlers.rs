use actix_web::{web, Responder, HttpResponse};
use serde::{Serialize, Deserialize};
use bcrypt::verify;
use chrono::{Utc, Duration};
use jsonwebtoken::{encode, decode, Header, EncodingKey, DecodingKey, Validation, TokenData, errors::Error as JwtError};
use crate::models::{User, Role};
use crate::services::create_user_service;
use mongodb::{Client, bson::doc};
use std::env;
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
struct Claims {
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

pub async fn refresh_token(client: web::Data<Client>, token_request: web::Json<TokenRequest>) -> impl Responder {
    let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");

    let access_token_data: Result<TokenData<Claims>, JwtError> = decode::<Claims>(
        &token_request.access_token,
        &DecodingKey::from_secret(secret.as_ref()),
        &Validation::default(),
    );

    let refresh_token_data: Result<TokenData<Claims>, JwtError> = decode::<Claims>(
        &token_request.refresh_token,
        &DecodingKey::from_secret(secret.as_ref()),
        &Validation::default(),
    );

    if let (Ok(access_claims), Ok(refresh_claims)) = (access_token_data, refresh_token_data) {
        if access_claims.claims.sub == refresh_claims.claims.sub && access_claims.claims.exp > Utc::now().timestamp() as usize {
            let new_refresh_token = create_jwt(
                access_claims.claims.sub.clone(),
                &access_claims.claims.username,
                &access_claims.claims.role,
                15, // 15 minutes for refresh token
            );
            let token_response = TokenRequest {
                access_token: token_request.access_token.clone(),
                refresh_token: new_refresh_token,
            };
            return HttpResponse::Ok().json(token_response);
        }
    }

    HttpResponse::Unauthorized().finish()
}

pub async fn create_user(client: web::Data<Client>, new_user: web::Json<CreateUser>) -> impl Responder {
    match create_user_service(&client, new_user.into_inner()).await {
        Ok(id) => HttpResponse::Ok().json(id),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

pub async fn login_user(client: web::Data<Client>, login_user: web::Json<LoginUser>) -> impl Responder {
    let db = client.database("auth-service");
    let collection = db.collection::<User>("credentials");

    println!("Attempting to find user with username: {}", login_user.username);
    let user = collection.find_one(doc! { "username": &login_user.username }).await.unwrap();

    if let Some(user) = user {
        println!("User found: {:?}", user);
        if verify(&login_user.password, &user.hashed_password).unwrap() {
            println!("Password verification succeeded");
            let access_token = create_jwt(user.id.unwrap().to_string(), &user.username, &user.role.to_string(), 30 * 24 * 60); // 1 mois
            let refresh_token = create_jwt(user.id.unwrap().to_string(), &user.username, &user.role.to_string(), 15); // 15 minutes
            let tokens = TokenRequest {
                access_token,
                refresh_token,
            };
            println!("Generated tokens: {:?}", tokens);
            return HttpResponse::Ok().json(tokens);
        } else {
            println!("Password verification failed");
        }
    } else {
        println!("User not found");
    }

    HttpResponse::Unauthorized().finish()
}

fn create_jwt(user_id: String, username: &str, role: &str, expiration_minutes: i64) -> String {
    let secret = std::env::var("JWT_SECRET").expect("JWT_SECRET must be set");

    let expiration = Utc::now()
        .checked_add_signed(Duration::minutes(expiration_minutes))
        .expect("valid timestamp")
        .timestamp() as usize;

    let claims = Claims {
        sub: user_id,
        username: username.to_owned(),
        role: role.to_owned(),
        exp: expiration,
    };

    encode(&Header::default(), &claims, &EncodingKey::from_secret(secret.as_ref()))
        .unwrap_or_else(|_| "Error creating token".to_string())
}