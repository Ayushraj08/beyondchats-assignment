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
    zip \
    && docker-php-ext-install zip pdo pdo_mysql \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

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
RUN a2ensite 000-default.conf

# --------------------------------------------------
# Create REQUIRED Laravel runtime directories
# (CRITICAL for file sessions, cache, views)
# --------------------------------------------------
RUN mkdir -p \
    bootstrap/cache \
    storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    && chmod -R 775 bootstrap/cache storage \
    && chown -R www-data:www-data bootstrap/cache storage

# --------------------------------------------------
# Install Composer
# --------------------------------------------------
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# --------------------------------------------------
# Install PHP dependencies (NO dev, NO env handling)
# --------------------------------------------------
RUN composer install --no-dev --optimize-autoloader --no-interaction

# --------------------------------------------------
# Clear Laravel caches (safe, does NOT require APP_KEY)
# --------------------------------------------------
RUN php artisan config:clear \
 && php artisan route:clear \
 && php artisan view:clear || true

# --------------------------------------------------
# Expose port & start Apache
# --------------------------------------------------
EXPOSE 80
CMD ["apache2-foreground"]
