# Use a cleaner, official PHP image
FROM php:8.2-cli

# Install necessary system libraries and PHP extensions
RUN apt-get update && apt-get install -y libzip-dev unzip libpq-dev postgresql-client && docker-php-ext-install pdo pdo_mysql zip pdo_pgsql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Set the working directory
WORKDIR /var/www/html

# Copy all the project files
COPY . .

# Create the .env file for the installer
RUN echo "APP_ENV=prod\nDATABASE_URL=postgres://user:pass@example.com:5432/db" > .env

# Allow Composer to run as root and install all dependencies
ENV COMPOSER_ALLOW_SUPERUSER=1
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Expose the port Render will use
EXPOSE 10000

# The Final Command: Start the PHP built-in web server
CMD ["php", "-S", "0.0.0.0:10000", "-t", "public"]
