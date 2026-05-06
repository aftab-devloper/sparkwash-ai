FROM php:8.2-fpm

# System dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nginx \
    supervisor

# PHP extensions
RUN apt-get update && apt-get install -y libicu-dev libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd intl zip \
    && pecl install redis \
    && docker-php-ext-enable redis

# Node.js 22
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Working directory
WORKDIR /var/www/sparkwash

# Copy files
COPY . .

# Fix public/storage
RUN mkdir -p public/storage

# Install PHP deps
RUN composer install --no-dev --optimize-autoloader

# Install Node deps & build
RUN npm install --legacy-peer-deps && npm run build

# Permissions
RUN chown -R www-data:www-data /var/www/sparkwash \
    && chmod -R 755 /var/www/sparkwash/storage \
    && php artisan storage:link --force

EXPOSE 9000
CMD ["php-fpm"]