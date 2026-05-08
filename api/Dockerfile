FROM lukemathwalker/cargo-chef:latest-rust-1 AS chef
WORKDIR /api

FROM chef AS planner
COPY . .
RUN cargo chef prepare --recipe-path recipe.json

FROM chef AS builder 
COPY --from=planner /api/recipe.json recipe.json
# Build dependencies - this is the caching Docker layer!
RUN cargo chef cook --release --recipe-path recipe.json
# Build application
COPY . .
RUN cargo build --release --bin api

# We do not need the Rust toolchain to run the binary!
FROM debian:trixie-slim AS runtime
WORKDIR /api
COPY --from=builder /api/target/release/api /usr/local/bin

EXPOSE 8080
ENTRYPOINT ["/usr/local/bin/api"]
