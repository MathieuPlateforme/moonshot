FROM rust:1.67 as builder
WORKDIR /usr/src/hello_world_api
COPY . .
RUN cargo install --path .

FROM debian:bullseye-slim
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*
COPY --from=builder /usr/local/cargo/bin/hello_world_api /usr/local/bin/hello_world_api
ENV ROCKET_ADDRESS=0.0.0.0
EXPOSE 8000
CMD ["hello_world_api"]
