use std::sync::Arc;

use axum::{Router, extract::{Path, State}, http::HeaderValue, response::IntoResponse, routing::get, serve};
use reqwest::{Method, header::{ACCEPT, AUTHORIZATION, CONTENT_TYPE}};
use tokio::net::TcpListener;
use tower_http::cors::{CorsLayer};
use tracing::*;

struct ServerUrl{
    url: &'static str,
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();
    let shared_state=Arc::new(ServerUrl{
        url:"https://nrel.serveousercontent.com",
    });

    let addrs=TcpListener::bind("0.0.0.0:8080").await.unwrap();
    let app=Router::new()
        .route("/", get(check_server))
        .route("/bldg", get(get_buildings))
        .route("/predictions/{bldg_id}", get(get_data))
        .route("/metrics", get(get_metrics))
        .layer(cors()).with_state(shared_state);
    serve(addrs, app).await.unwrap();
}

fn cors()-> CorsLayer{
    CorsLayer::new()
        .allow_origin("http://34.70.98.219:3000".parse::<HeaderValue>().unwrap())
        .allow_origin("http://decomposeengine.com:3000".parse::<HeaderValue>().unwrap())
        .allow_origin("http://localhost:5173".parse::<HeaderValue>().unwrap())
        .allow_methods([Method::GET])
        .allow_headers([ACCEPT,AUTHORIZATION, CONTENT_TYPE])
}

async fn get_data(State(state):State<Arc<ServerUrl>>,Path(bldg_id): Path<String>) -> impl IntoResponse{
    let client=reqwest::Client::new();
    let url=state.url;
    info!("Requesting data from the modelling server");
    let res=client.get(format!("{url}/predictions/{bldg_id}"))
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


async fn check_server(State(state):State<Arc<ServerUrl>>) -> String{
    let client=reqwest::Client::new();
    let url=state.url;
    println!("{:?}", url);
    let res=client.get(format!("{url}"))
        .send().await;
    info!("Checking the Status of the server");
    match res{
        Ok(msg) => {
            info!("Server is Okay");
            msg.text().await.unwrap()
        } 

        Err(_) => {
            warn!("Error server is not active");
            "error in server, server is not activated".to_string()
        }
    }
}
async fn get_metrics(State(state): State<Arc<ServerUrl>>) -> String{
    let client=reqwest::Client::new();
    let url=state.url;
    let res=client.get(format!("{url}/metrics")).send().await;
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

async fn get_buildings(State(state):State<Arc<ServerUrl>>) -> String{
    let client=reqwest::Client::new();
    let url=state.url;
    info!("Requesting buildings from the modelling server");
    let res=client.get(format!("{url}/buildings")).send().await;
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

