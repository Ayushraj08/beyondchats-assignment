#!/bin/bash
set -e

echo "🚀 Starting Laravel container..."

# --------------------------------------------------
# Ensure correct working directory
# --------------------------------------------------
cd /var/www/html

# --------------------------------------------------
# Fix permissions (Render-safe)
# --------------------------------------------------
echo "🔐 Fixing permissions..."
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# --------------------------------------------------
# Wait for database (PostgreSQL – Render)
# --------------------------------------------------
if [ "$DB_CONNECTION" = "pgsql" ]; then
  echo "⏳ Waiting for PostgreSQL to be ready..."
  until php -r "
    try {
      new PDO(
        'pgsql:host=' . getenv('DB_HOST') . ';port=' . getenv('DB_PORT') . ';dbname=' . getenv('DB_DATABASE'),
        getenv('DB_USERNAME'),
        getenv('DB_PASSWORD')
      );
    } catch (Exception \$e) {
      exit(1);
    }
  "; do
    sleep 2
    echo '⏳ PostgreSQL not ready yet...'
  done
  echo "✅ PostgreSQL is ready!"
fi

# --------------------------------------------------
# Run migrations (SAFE in production)
# --------------------------------------------------
echo "🗄️ Running migrations..."
php artisan migrate --force || {
  echo "❌ Migration failed"
  exit 1
}

# --------------------------------------------------
# Seed database (SAFE: relies on idempotent seeders)
# --------------------------------------------------
echo "🌱 Seeding database..."
php artisan db:seed --force || {
  echo "⚠️ Seeder failed (continuing safely)"
}

# --------------------------------------------------
# Clear & optimize cache
# --------------------------------------------------
echo "🧹 Clearing cache..."
php artisan optimize:clear || true

# --------------------------------------------------
# Start Apache
# --------------------------------------------------
echo "🌐 Starting Apache..."
exec apache2-foreground
