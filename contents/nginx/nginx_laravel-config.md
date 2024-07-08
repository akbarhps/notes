# Nginx Laravel Configuration

### Commands to run before set nginx config

```bash
composer install --optimize-autoloader --no-dev

# generate key
php artisan key:generate --force

# migrate database
php artisan migrate --force

# clear all cache
php artisan optimize:clear

# cache app
php artisan config:cache
php artisan event:cache
php artisan route:cache
php artisan view:cache

# modify folder group and permission
chgrp -R www-data storage bootstrap/cache
chmod -R ug+rwx storage bootstrap/cache
```

### example.com.conf

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com;

    # this return use for redirecting all http request to https
    return 301 https://example.com;

    root /var/www/html/example/public;
    index index.php index.html index.htm index.nginx-debian.html;

    charset utf-8;
    client_body_timeout 5s;
    client_header_timeout 5s;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";

    proxy_set_header X-Forwarded-For $proxy_protocol_addr; # To forward the original client's IP address
    proxy_set_header X-Forwarded-Proto $scheme; # to forward the  original protocol (HTTP or HTTPS)
    proxy_set_header Host $host; # to forward the original host requested by the client

    access_log /var/log/nginx/example.com.access.log;
    error_log /var/log/nginx/example.com.error.log warn;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
        proxy_buffer_size          128k;
        proxy_buffers              4 256k;
        proxy_busy_buffers_size    256k;
    }

    location ~ \.php$ {
        # This line checks if the PHP script specified in $fastcgi_script_name exists before passing it to the FastCGI server.
        # If the file does not exist, Nginx will return a 404 Not Found error.
        # This helps prevent security issues where an attacker could potentially execute arbitrary PHP code by specifying a non-existent PHP file.
        try_files $fastcgi_script_name =404;

        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }
    location ~ /\.(?!well-known).* { deny all; }

    error_page 404 /index.php;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name example.com www.example.com;

    root /var/www/html/example/public;
    index index.php index.html index.htm index.nginx-debian.html;

    # or any other location that contains the SSL configuration
    include /etc/nginx/ssl.d/ssl.conf;
    include /etc/nginx/security.d/security.conf;

    charset utf-8;
    client_body_timeout 5s;
    client_header_timeout 5s;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";

    proxy_set_header X-Forwarded-For $proxy_protocol_addr; # To forward the original client's IP address
    proxy_set_header X-Forwarded-Proto $scheme; # to forward the  original protocol (HTTP or HTTPS)
    proxy_set_header Host $host; # to forward the original host requested by the client

    access_log /var/log/nginx/example.com.access.log;
    error_log /var/log/nginx/example.com.error.log warn;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
        proxy_buffer_size          128k;
        proxy_buffers              4 256k;
        proxy_busy_buffers_size    256k;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }
    location ~ /\.(?!well-known).* { deny all; }

    error_page 404 /index.php;
}
```

