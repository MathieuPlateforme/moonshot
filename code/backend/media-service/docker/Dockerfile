# docker/Dockerfile

# Use the official PHP image as the base
FROM php:8.2-fpm

# Install system dependencies including netcat-openbsd
RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    git \
    curl \
    netcat-openbsd \
    && docker-php-ext-install pdo pdo_mysql zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/symfony

# Copy existing application directory contents
COPY . /var/www/symfony

# Copy custom php.ini settings
COPY docker/php.ini /usr/local/etc/php/php.ini

# Copy entrypoint script and set permissions
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Install Symfony dependencies
RUN composer install --prefer-dist --no-dev --no-scripts --no-progress --no-interaction

EXPOSE 80
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]