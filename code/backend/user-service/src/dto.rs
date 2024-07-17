use chrono::{NaiveDate, NaiveDateTime};
use diesel::{AsChangeset, Insertable};
use serde_derive::{Deserialize, Serialize};
use uuid::Uuid;

use crate::schema::{addresses, users};

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = users)]
pub struct CreateUserDto {
    pub firstname: String,
    pub lastname: String,
    pub email: String,
    pub birthdate: NaiveDate,
    pub username: String,
    pub phone: Option<String>,
    pub role: String,
}

#[derive(AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = users)]
pub struct UpdateUserDto {
    pub firstname: Option<String>,
    pub lastname: Option<String>,
    pub email: Option<String>,
    pub birthdate: Option<NaiveDate>,
    pub username: Option<String>,
    pub phone: Option<String>,
    pub role: Option<String>,
}

#[derive(Serialize, Deserialize)]
pub struct UserResponseDto {
    pub user_id: Uuid,
    pub firstname: String,
    pub lastname: String,
    pub email: String,
    pub birthdate: NaiveDate,
    pub username: String,
    pub phone: Option<String>,
    pub role: String,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = addresses)]
pub struct CreateAddressDto {
    pub user_id: Uuid,
    pub street: String,
    pub city: String,
    pub state: String,
    pub postal_code: String,
    pub country: String,
}

#[derive(AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = addresses)]
pub struct UpdateAddressDto {
    pub street: Option<String>,
    pub city: Option<String>,
    pub state: Option<String>,
    pub postal_code: Option<String>,
    pub country: Option<String>,
}

#[derive(Serialize, Deserialize)]
pub struct AddressResponseDto {
    pub address_id: Uuid,
    pub user_id: Uuid,
    pub street: String,
    pub city: String,
    pub state: String,
    pub postal_code: String,
    pub country: String,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}
