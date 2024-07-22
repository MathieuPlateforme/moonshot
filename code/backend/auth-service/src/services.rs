use mongodb::Client;
use mongodb::bson::doc;
use bcrypt::{hash, DEFAULT_COST};
use chrono::Utc;
use mongodb::bson::oid::ObjectId;
use crate::models::{User};
use crate::handlers::CreateUser;

pub async fn create_user_service(client: &Client, new_user: CreateUser) -> Result<ObjectId, mongodb::error::Error> {
    let db = client.database("auth-service");
    let collection = db.collection::<User>("credentials");

    let hashed_password = hash(&new_user.password, DEFAULT_COST).unwrap();
    let now = Utc::now();
    let user = User {
        id: None,
        username: new_user.username.clone(),
        hashed_password,
        email: new_user.email.clone(),
        created_at: now,
        updated_at: now,
        is_active: true,
        role: new_user.role.clone(),
    };

    let insert_result = collection.insert_one(user).await?;
    Ok(insert_result.inserted_id.as_object_id().unwrap())
}