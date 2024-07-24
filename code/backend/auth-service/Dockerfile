FROM rust:1.79 as builder
WORKDIR /usr/src/auth-service
COPY . .
RUN cargo install --path .

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*
COPY --from=builder /usr/local/cargo/bin/auth-service /usr/local/bin/auth-service
ENV RABBITMQ_URI=amqp://username:password@rabbitmq:5672
ENV JWT_SECRET=V19SzSxgDBExu5nxExjq/RP2Uz7i+JWq0ZHB6KHv11M=
ENV MONGODB_URI=mongodb+srv://elarifinzoudine:3diMrSTZNALQ01y2@authservicedb.qsnqxjq.mongodb.net/
ENV PORT=8081
EXPOSE 8081
CMD ["auth-service"]