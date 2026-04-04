use axum::{Router, extract::Path, http::HeaderValue, routing::get, serve};
use reqwest::{Method, header::{ACCEPT, AUTHORIZATION, CONTENT_TYPE}};
use tokio::net::TcpListener;
use serde::Deserialize;
use tower_http::cors::{CorsLayer};
#[tokio::main]
async fn main() {
    let addrs=TcpListener::bind("localhost:8080").await.unwrap();
    let app=Router::new()
        .route("/bldg", get(get_buildings))
        .route("/predictions/{bldg_id}", get(get_data))
        .layer(cors());
    serve(addrs, app).await.unwrap();
}

fn cors()-> CorsLayer{
    CorsLayer::new()
        .allow_origin("http://localhost:5173".parse::<HeaderValue>().unwrap())
        .allow_methods([Method::GET])
        .allow_headers([ACCEPT,AUTHORIZATION, CONTENT_TYPE])
}

#[derive(Deserialize)]
struct Data{
    data: String,
}

async fn get_data(Path(bldg_id): Path<String>) -> String{
    let client=reqwest::Client::new();
    let res=client.get(format!("http://localhost:8000/predictions/{bldg_id}"))
        .send().await;
    match res{
        Ok(msg) => {
            // msg.json::<Data>().await.unwrap().data
            msg.text().await.unwrap()
        } 
        Err(_) => "error in sending the get response to the server".to_string()
    }
}

async fn get_buildings() -> String{
    let client=reqwest::Client::new();
    let res=client.get("http://localhost:8000/buildings").send().await;
    match res{
        Ok(msg) => {
            // msg.json::<Data>().await.unwrap().data
            println!("{:?}", msg.headers());
            msg.text().await.unwrap()
        } 
        Err(_) => "error in sending the get response to the server".to_string()
    }
}

