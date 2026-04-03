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
    let res=client.get("http://localhost:8000/ids").send().await;
    match res{
        Ok(msg) => {
            // msg.json::<Data>().await.unwrap().data
            msg.text().await.unwrap()
        } 
        Err(_) => "error in sending the get response to the server".to_string()
    }
}

