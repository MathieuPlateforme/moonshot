use diesel::{Insertable, Queryable};
use diesel::internal::derives::multiconnection::chrono;
use serde_derive::{Deserialize, Serialize};
use uuid::Uuid;

use crate::schema::users;

#[derive(Queryable, Serialize, Deserialize, Insertable)]
#[diesel(table_name = users)]
pub struct Users {
    pub user_id: Uuid,
    pub firstname: String,
    pub lastname: String,
    pub email: String,
    pub birthdate: chrono::NaiveDate,
    pub username: String,
    pub phone: Option<String>,
    pub role: String,
    pub created_at: Option<chrono::NaiveDateTime>,
    pub updated_at: Option<chrono::NaiveDateTime>,
}

#[derive(Queryable, Serialize, Deserialize)]
pub struct Address {
    pub address_id: Uuid,
    pub user_id: Uuid,
    pub street: String,
    pub city: String,
    pub state: String,
    pub postal_code: String,
    pub country: String,
    pub created_at: Option<chrono::NaiveDateTime>,
    pub updated_at: Option<chrono::NaiveDateTime>,
}
