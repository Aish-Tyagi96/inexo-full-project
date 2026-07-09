# Apache Configuration Guide for Production Deployment (XAMPP Windows)

This guide explains how to configure Apache in XAMPP to host the Frontend, Admin Portal, and Backend API on separate domains and subdomains using SSL (port 443).

## Prerequisites

Ensure the following Apache modules are enabled in `C:/xampp/apache/conf/httpd.conf`. Remove the `#` character in front of them if they are commented out:

```apache
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
LoadModule rewrite_module modules/mod_rewrite.so
LoadModule ssl_module modules/mod_ssl.so
```

---

## Production Hostnames & Virtual Hosts

Add the following `<VirtualHost>` blocks to your Apache virtual hosts configuration file (usually `C:/xampp/apache/conf/extra/httpd-vhosts.conf` or `httpd-ssl.conf`).

### 1. Website Frontend (`https://inexocast.in` & `https://www.inexocast.in`)

Serves the compiled React files from `inexo-website/dist` and proxies media uploads.

```apache
<VirtualHost *:443>
    ServerName inexocast.in
    ServerAlias www.inexocast.in

    # Path to inexo-website/dist build folder
    DocumentRoot "C:/xampp/htdocs/inexo-website/dist"

    SSLEngine on
    SSLCertificateFile "C:/xampp/apache/conf/ssl.crt/inexocast.crt"
    SSLCertificateKeyFile "C:/xampp/apache/conf/ssl.key/inexocast.key"
    SSLCertificateChainFile "C:/xampp/apache/conf/ssl.crt/ca-bundle.crt"

    # Directory configuration for React Single Page App (SPA) routing
    <Directory "C:/xampp/htdocs/inexo-website/dist">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted

        # Fallback to index.html for React client-side routing
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    # Proxy uploads requests to the Node.js backend
    ProxyPreserveHost On
    ProxyPass /uploads http://127.0.0.1:4000/uploads
    ProxyPassReverse /uploads http://127.0.0.1:4000/uploads

    ErrorLog "logs/inexocast_website_error.log"
    CustomLog "logs/inexocast_website_access.log" common
</VirtualHost>
```

---

## 2. Admin Portal (`https://admin.inexocast.in`)

Serves the compiled React Admin Portal files from `inexo-admin-portal/dist` and proxies uploads.

```apache
<VirtualHost *:443>
    ServerName admin.inexocast.in

    # Path to inexo-admin-portal/dist build folder
    DocumentRoot "C:/xampp/htdocs/inexo-admin-portal/dist"

    SSLEngine on
    SSLCertificateFile "C:/xampp/apache/conf/ssl.crt/inexocast.crt"
    SSLCertificateKeyFile "C:/xampp/apache/conf/ssl.key/inexocast.key"
    SSLCertificateChainFile "C:/xampp/apache/conf/ssl.crt/ca-bundle.crt"

    # Directory configuration for React Single Page App (SPA) routing
    <Directory "C:/xampp/htdocs/inexo-admin-portal/dist">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted

        # Fallback to index.html for React client-side routing
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    # Proxy uploads requests to the Node.js backend
    ProxyPreserveHost On
    ProxyPass /uploads http://127.0.0.1:4000/uploads
    ProxyPassReverse /uploads http://127.0.0.1:4000/uploads

    ErrorLog "logs/inexocast_admin_error.log"
    CustomLog "logs/inexocast_admin_access.log" common
</VirtualHost>
```

---

## 3. API Server (`https://api.inexocast.in`)

Proxies all requests directly to the Express Node.js backend running on port `4000`.

```apache
<VirtualHost *:443>
    ServerName api.inexocast.in

    SSLEngine on
    SSLCertificateFile "C:/xampp/apache/conf/ssl.crt/inexocast.crt"
    SSLCertificateKeyFile "C:/xampp/apache/conf/ssl.key/inexocast.key"
    SSLCertificateChainFile "C:/xampp/apache/conf/ssl.crt/ca-bundle.crt"

    # Proxy all traffic to the running Node.js backend server
    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:4000/
    ProxyPassReverse / http://127.0.0.1:4000/

    ErrorLog "logs/inexocast_api_error.log"
    CustomLog "logs/inexocast_api_access.log" common
</VirtualHost>
```

---

## Uploads and Media Explanation

Since the database uses relative paths like `/uploads/images/filename.jpg`, the browser resolves them on whatever domain it is currently on.
Adding the `ProxyPass /uploads` directive in both the frontend and admin config ensures that images will load seamlessly.
