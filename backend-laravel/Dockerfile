FROM php:8.2-apache

# --------------------------------------------------
# Enable Apache modules
# --------------------------------------------------
RUN a2enmod rewrite

# --------------------------------------------------
# Install system dependencies + PHP extensions
# --------------------------------------------------
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libsqlite3-dev \
    zip \
    && docker-php-ext-install zip pdo pdo_mysql pdo_sqlite \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# --------------------------------------------------
# Force SQLite in production (CRITICAL FIX)
# --------------------------------------------------
ENV DB_CONNECTION=sqlite
ENV DB_DATABASE=/var/www/html/database/database.sqlite

# --------------------------------------------------
# Set working directory
# --------------------------------------------------
WORKDIR /var/www/html

# --------------------------------------------------
# Copy application source
# --------------------------------------------------
COPY . .

# --------------------------------------------------
# Apache virtual host (points to /public)
# --------------------------------------------------
COPY 000-default.conf /etc/apache2/sites-available/000-default.conf
RUN a2ensite 000-default.conf \
 && a2dissite 000-default.conf.default || true

# --------------------------------------------------
# Create REQUIRED Laravel runtime directories
# --------------------------------------------------
RUN mkdir -p \
    bootstrap/cache \
    storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    database \
    && touch database/database.sqlite \
    && chmod -R 775 bootstrap/cache storage database \
    && chown -R www-data:www-data bootstrap/cache storage database

# --------------------------------------------------
# Install Composer
# --------------------------------------------------
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# --------------------------------------------------
# Install PHP dependencies
# --------------------------------------------------
RUN composer install --no-dev --optimize-autoloader --no-interaction

# --------------------------------------------------
# Clear Laravel caches (safe in Docker)
# --------------------------------------------------
RUN php artisan config:clear \
 && php artisan route:clear \
 && php artisan view:clear || true

# --------------------------------------------------
# Use custom entrypoint
# --------------------------------------------------
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

# --------------------------------------------------
# Expose port
# --------------------------------------------------
EXPOSE 80
