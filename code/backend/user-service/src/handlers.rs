use actix_web::{HttpResponse, Responder, web};
use diesel::ExpressionMethods;
use diesel::QueryDsl;
use diesel::RunQueryDsl;
use lapin::BasicProperties;
use lapin::options::BasicPublishOptions;
use serde_json::json;

use user_service::dto::{AuthInfoDto, CreateUserDto, UpdateUserDto, UserResponseDto};
use user_service::establish_connection;
use user_service::models::Users;
use user_service::mq::{EXCHANGE_NAME, ROUTING_KEY_USER_CREATED, ROUTING_KEY_USER_DELETED, ROUTING_KEY_USER_UPDATED, setup_rabbitmq};
use user_service::schema::users;

pub async fn health_check() -> impl Responder {
    HttpResponse::Ok().finish()
}

pub async fn create_user(user_dto: web::Json<CreateUserDto>) -> impl Responder {
    let mut connection = establish_connection();

    let user = Users {
        user_id: uuid::Uuid::new_v4(),
        firstname: user_dto.firstname.clone(),
        lastname: user_dto.lastname.clone(),
        email: user_dto.email.clone(),
        birthdate: user_dto.birthdate.clone(),
        username: user_dto.username.clone(),
        phone: None,
        role: match user_dto.role.as_str() {
            "admin" | "user" => user_dto.role.clone(),
            _ => "user".to_string(),
        },
        created_at: None,
        updated_at: None,
    };

    diesel::insert_into(users::table)
        .values(&user)
        .execute(&mut connection)
        .expect("Error inserting user");

    let auth_info = AuthInfoDto {
        email: user_dto.email.clone(),
        username: user_dto.username.clone(),
        password: user_dto.password.clone(),
        user_id: user.user_id,
    };

    let channel = setup_rabbitmq().await.expect("Failed to connect to RabbitMQ");
    let payload = serde_json::to_string(&auth_info).unwrap();

    let _confirmation = channel.basic_publish(
        EXCHANGE_NAME,
        ROUTING_KEY_USER_CREATED,
        BasicPublishOptions::default(),
        payload.as_bytes(),
        BasicProperties::default(),
    ).await.expect("Failed to publish message");

    log::info!("Channel: {:?}", channel);
    log::info!("Payload: {:?}", payload);
    log::info!("Confirmation: {:?}", _confirmation);

    HttpResponse::Created().json(json!({"message": "User created"}))
}

pub async fn get_user(path: web::Path<(uuid::Uuid,)>) -> impl Responder {
    let mut connection = establish_connection();
    let user_id = path.into_inner().0;
    let result = users::table.find(user_id).first::<Users>(&mut connection);

    match result {
        Ok(user) => {
            let response_dto = UserResponseDto {
                user_id: user.user_id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                birthdate: user.birthdate,
                username: user.username,
                phone: user.phone,
                role: user.role,
                street: None,
                city: None,
                state: None,
                postal_code: None,
                country: None,
                created_at: user.created_at.unwrap(),
                updated_at: user.updated_at.unwrap(),
            };
            HttpResponse::Ok().json(response_dto)
        }
        Err(_) => HttpResponse::NotFound().json(json!({"message": "User not found"})),
    }
}

pub async fn update_user(path: web::Path<(uuid::Uuid,)>, user_dto: web::Json<UpdateUserDto>) -> impl Responder {
    let mut connection = establish_connection();
    let user_id = path.into_inner().0;
    let update_query = diesel::update(users::table.find(user_id));

    let update_builder = update_query.set((
        user_dto.firstname.as_ref().map(|firstname| users::firstname.eq(firstname)),
        user_dto.lastname.as_ref().map(|lastname| users::lastname.eq(lastname)),
        user_dto.email.as_ref().map(|email| users::email.eq(email)),
        user_dto.birthdate.as_ref().map(|birthdate| users::birthdate.eq(birthdate)),
        user_dto.username.as_ref().map(|username| users::username.eq(username)),
        user_dto.phone.as_ref().map(|phone| users::phone.eq(phone)),
        user_dto.role.as_ref().map(|role| users::role.eq(role)),
        Some(users::updated_at.eq(chrono::Local::now().naive_local())),
    ));

    let result = update_builder.execute(&mut connection);

    let auth_info = AuthInfoDto {
        email: user_dto.email.clone().unwrap_or("".to_string()),
        username: user_dto.username.clone().unwrap_or("".to_string()),
        password: user_dto.password.clone().unwrap_or("".to_string()),
        user_id,
    };

    let channel = setup_rabbitmq().await.expect("Failed to connect to RabbitMQ");
    let payload = serde_json::to_string(&auth_info).unwrap();

    let _confirmation = channel.basic_publish(
        EXCHANGE_NAME,
        ROUTING_KEY_USER_UPDATED,
        BasicPublishOptions::default(),
        payload.as_bytes(),
        BasicProperties::default(),
    ).await.expect("Failed to publish message");

    match result {
        Ok(_) => HttpResponse::Ok().json(json!({"message": "User updated"})),
        Err(_) => HttpResponse::NotFound().json(json!({"message": "User not found"})),
    }
}

pub async fn delete_user(path: web::Path<(uuid::Uuid,)>) -> impl Responder {
    let mut connection = establish_connection();
    let user_id = path.into_inner().0;
    let result = diesel::delete(users::table.find(user_id)).execute(&mut connection);

    let payload = serde_json::to_string(&user_id).unwrap();
    let channel = setup_rabbitmq().await.expect("Failed to connect to RabbitMQ");
    let _confirmation = channel.basic_publish(
        EXCHANGE_NAME,
        ROUTING_KEY_USER_DELETED,
        BasicPublishOptions::default(),
        payload.as_bytes(),
        BasicProperties::default(),
    ).await.expect("Failed to publish message");

    match result {
        Ok(_) => HttpResponse::Ok().json(json!({"message": "User deleted"})),
        Err(_) => HttpResponse::NotFound().json(json!({"message": "User not found"})),
    }
}

pub async fn get_all_users() -> impl Responder {
    let mut connection = establish_connection();
    let result = users::table.load::<Users>(&mut connection);

    match result {
        Ok(users) => {
            let response_dto: Vec<UserResponseDto> = users
                .iter()
                .map(|user| UserResponseDto {
                    user_id: user.user_id,
                    firstname: user.firstname.clone(),
                    lastname: user.lastname.clone(),
                    email: user.email.clone(),
                    birthdate: user.birthdate,
                    username: user.username.clone(),
                    phone: user.phone.clone(),
                    role: user.role.clone(),
                    street: None,
                    city: None,
                    state: None,
                    postal_code: None,
                    country: None,
                    created_at: user.created_at.unwrap(),
                    updated_at: user.updated_at.unwrap(),
                })
                .collect();
            HttpResponse::Ok().json(response_dto)
        }
        Err(_) => HttpResponse::NotFound().json(json!({"message": "Users not found"})),
    }
}

pub async fn create_address() -> impl Responder {
    HttpResponse::Ok().finish()
}

pub async fn get_address() -> impl Responder {
    HttpResponse::Ok().finish()
}

pub async fn update_address() -> impl Responder {
    HttpResponse::Ok().finish()
}

pub async fn delete_address() -> impl Responder {
    HttpResponse::Ok().finish()
}

pub async fn get_all_addresses() -> impl Responder {
    HttpResponse::Ok().finish()
}
