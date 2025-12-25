#!/bin/bash
set -e

echo "🚀 Starting Laravel container..."

# --------------------------------------------------
# Ensure correct working directory
# --------------------------------------------------
cd /var/www/html

# --------------------------------------------------
# Ensure SQLite database exists (SAFE)
# --------------------------------------------------
if [ ! -f database/database.sqlite ]; then
  echo "📦 Creating SQLite database file..."
  touch database/database.sqlite
fi

# Always fix permissions (Render resets filesystem)
chown -R www-data:www-data database storage bootstrap/cache
chmod -R 775 database storage bootstrap/cache
chmod 664 database/database.sqlite

# --------------------------------------------------
# Run migrations (SAFE to re-run)
# --------------------------------------------------
echo "🗄️ Running migrations..."
php artisan migrate --force || {
  echo "❌ Migration failed"
  exit 1
}

# --------------------------------------------------
# Seed database (IDEMPOTENT & PRODUCTION SAFE)
# --------------------------------------------------
if php artisan migrate:status >/dev/null 2>&1; then
  echo "🌱 Seeding database..."
  php artisan db:seed --force || {
    echo "⚠️ Seeder failed (continuing safely)"
  }
fi

# --------------------------------------------------
# MySQL → SQLite migration (LOCAL ONLY)
# --------------------------------------------------
if [ "$APP_ENV" != "production" ]; then
  echo "🔁 Migrating MySQL → SQLite (local only)..."
  php artisan migrate:mysql-to-sqlite || true
else
  echo "🚫 Skipping MySQL → SQLite migration in production"
fi

# --------------------------------------------------
# Clear & optimize cache (SAFE)
# --------------------------------------------------
echo "🧹 Clearing cache..."
php artisan optimize:clear || true

# --------------------------------------------------
# Start Apache
# --------------------------------------------------
echo "🌐 Starting Apache..."
exec apache2-foreground
