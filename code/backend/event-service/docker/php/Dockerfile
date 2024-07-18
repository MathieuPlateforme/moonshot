# Specify the parent image from which we are building 
FROM php:8.2-fpm

# Update and install lib & php extension
RUN apt-get update \
    && apt-get install -y zlib1g-dev g++ git libicu-dev zip libzip-dev zip \
    && docker-php-ext-install intl pdo pdo_mysql \
    && docker-php-ext-enable pdo_mysql \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip

# Copy the Composer PHAR from the Composer image into the PHP image
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Sets the working directory for the instruction that follow it
WORKDIR /var/www

# Install composer
CMD composer install ;  php-fpm

# Install symfony
RUN curl -sS https://get.symfony.com/cli/installer | bash 
RUN mv /root/.symfony5/bin/symfony /usr/local/bin/symfony

# Inform docker that the container listens on the specified network ports at runtime
EXPOSE 9000