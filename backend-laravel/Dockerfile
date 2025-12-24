FROM php:8.2-apache

# Enable Apache rewrite
RUN a2enmod rewrite

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    zip \
    && docker-php-ext-install zip pdo pdo_mysql

# Set working directory
WORKDIR /var/www/html

# Copy project files
COPY . .

# 🔑 CREATE REQUIRED DIRECTORIES BEFORE COMPOSER
RUN mkdir -p bootstrap/cache storage \
    && chmod -R 775 bootstrap/cache storage

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 🔑 RUN COMPOSER AFTER PERMISSIONS
RUN composer install --no-dev --optimize-autoloader

# Fix ownership
RUN chown -R www-data:www-data /var/www/html

# Expose Apache port
EXPOSE 80

CMD ["apache2-foreground"]
