// @generated automatically by Diesel CLI.

diesel::table! {
    addresses (address_id) {
        address_id -> Uuid,
        user_id -> Uuid,
        street -> Varchar,
        city -> Varchar,
        state -> Varchar,
        postal_code -> Varchar,
        country -> Varchar,
        created_at -> Nullable<Timestamptz>,
        updated_at -> Nullable<Timestamptz>,
    }
}

diesel::table! {
    users (user_id) {
        user_id -> Uuid,
        firstname -> Varchar,
        lastname -> Varchar,
        email -> Varchar,
        birthdate -> Date,
        username -> Varchar,
        phone -> Nullable<Varchar>,
        role -> Varchar,
        created_at -> Nullable<Timestamptz>,
        updated_at -> Nullable<Timestamptz>,
    }
}

diesel::joinable!(addresses -> users (user_id));

diesel::allow_tables_to_appear_in_same_query!(
    addresses,
    users,
);
