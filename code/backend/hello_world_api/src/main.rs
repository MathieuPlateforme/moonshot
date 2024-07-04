#[macro_use] extern crate rocket;

use rocket::serde::json::Json;
use serde::Serialize;

#[derive(Serialize)]
struct Response {
    message: &'static str,
}

#[post("/login")]
fn login() -> Json<Response> {
    Json(Response {
        message: "Hello World",
    })
}

#[post("/register")]
fn register() -> Json<Response> {
    Json(Response {
        message: "Hello World",
    })
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![login, register])
}
