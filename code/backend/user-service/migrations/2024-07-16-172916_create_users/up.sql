-- Your SQL goes here
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    birthdate DATE NOT NULL,
    username VARCHAR NOT NULL UNIQUE,
    phone VARCHAR,
    role VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
