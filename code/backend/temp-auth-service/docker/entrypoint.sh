#!/bin/sh

set -e

# Wait for the database to be ready
until nc -z -v -w30 "$DB_HOST" "$DB_PORT"; do
  echo "Waiting for database connection..."
  sleep 1
done

# Run database migrations
echo "Running database migrations..."
php bin/console doctrine:migrations:migrate --no-interaction

# Start Symfony server and keep it running
echo "Starting Symfony server..."
exec php -S 0.0.0.0:80 -t public