FROM rust:1.79 as builder
WORKDIR /usr/src/user-service
COPY . .
RUN cargo install --path .

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*
COPY --from=builder /usr/local/cargo/bin/user-service /usr/local/bin/user-service
CMD ["user-service"]
