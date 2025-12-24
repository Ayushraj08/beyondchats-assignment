#!/bin/bash
set -e

echo "🚀 Starting Laravel container..."

# Ensure SQLite file exists
if [ ! -f database/database.sqlite ]; then
  echo "📦 Creating SQLite database file..."
  touch database/database.sqlite
  chown www-data:www-data database/database.sqlite
  chmod 664 database/database.sqlite
fi

echo "🗄️ Running migrations..."
php artisan migrate --force

if [ "$APP_ENV" != "production" ]; then
  echo "🔁 Migrating MySQL → SQLite (local only)..."
  php artisan migrate:mysql-to-sqlite || true
else
  echo "🚫 Skipping MySQL → SQLite migration in production"
fi

echo "🧹 Clearing cache..."
php artisan optimize:clear

echo "🌐 Starting Apache..."
exec apache2-foreground
