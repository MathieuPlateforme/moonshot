CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE addresses (
    address_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    street VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    state VARCHAR NOT NULL,
    postal_code VARCHAR NOT NULL,
    country VARCHAR NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW (),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW (),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);
