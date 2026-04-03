use axum::{Router, routing::get, serve};
use tokio::net::TcpListener;
use serde::Deserialize;

#[tokio::main]
async fn main() {
    let addrs=TcpListener::bind("localhost:8080").await.unwrap();
    let app=Router::new().route("/", get(get_data));
    serve(addrs, app).await.unwrap();
}

#[derive(Deserialize)]
struct Data{
    data: String,
}
async fn get_data() -> String{
    let client=reqwest::Client::new();
    let res=client.get("localhost:8000").send().await;

    match res{
        Ok(msg) => {
            msg.json::<Data>().await.unwrap().data
        } 
        Err(_) => "failed to get the buildings data".to_string()
    }
}

