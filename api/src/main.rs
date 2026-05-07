use axum::{Router, extract::Path, http::HeaderValue, response::IntoResponse, routing::get, serve};
use reqwest::{Method, header::{ACCEPT, AUTHORIZATION, CONTENT_TYPE}};
use tokio::net::TcpListener;
use tower_http::cors::{CorsLayer};
use tracing::*;
#[tokio::main]
async fn main() {
    let addrs=TcpListener::bind("localhost:8080").await.unwrap();
    let app=Router::new()
        .route("/bldg", get(get_buildings))
        .route("/predictions/{bldg_id}", get(get_data))
        .route("/metrics", get(get_metrics))
        .layer(cors());
    serve(addrs, app).await.unwrap();
}

fn cors()-> CorsLayer{
    CorsLayer::new()
        .allow_origin("http://localhost:5173".parse::<HeaderValue>().unwrap())
        .allow_methods([Method::GET])
        .allow_headers([ACCEPT,AUTHORIZATION, CONTENT_TYPE])
}

async fn get_data(Path(bldg_id): Path<String>) -> impl IntoResponse{
    let client=reqwest::Client::new();
    info!("Requesting data from the modelling server");
    let res=client.get(format!("http://localhost:8000/predictions/{bldg_id}"))
        .send().await;
    match res{
        Ok(msg) => {
            info!("Predictions received successfully");
            msg.text().await.unwrap()
        } 
        Err(_) => {
            warn!("Error retrieving predictions from the server");
            "error in sending the get response to the server".to_string()
        }
    }
}

async fn get_metrics() -> String{
    let client=reqwest::Client::new();
    let res=client.get("http://localhost:8000/metrics").send().await;
    info!("Requesting Metrics from the modelling server");
    match res{
        Ok(msg) => {
            info!("metrics received successfully");
            msg.text().await.unwrap()
        } 

        Err(_) => {
            warn!("Error retrieving metrics from the server");
            "error in sending the get response to the server".to_string()
        }
    }
}

async fn get_buildings() -> String{
    let client=reqwest::Client::new();
    info!("Requesting buildings from the modelling server");
    let res=client.get("http://localhost:8000/buildings").send().await;
    match res{
        Ok(msg) => {
            info!("Buildings received successfully");
            msg.text().await.unwrap()
        } 

        Err(_) => {
            warn!("Error retrieving buildings from the server");
            "error in sending the get response to the server".to_string()
        }
    }
}

