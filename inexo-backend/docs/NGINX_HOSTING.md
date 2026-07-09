# Nginx Configuration Guide for Production Deployment

This guide explains how to configure Nginx to host the Frontend, Admin Portal, and Backend API on separate domains and subdomains.

## Production Hostnames

- **Frontend**: `https://inexocast.in` (serves compiled `inexo-website` files)
- **Admin Portal**: `https://admin.inexocast.in` (serves compiled `inexo-admin-portal` files)
- **API Server**: `https://api.inexocast.in` (proxies requests to the running Node.js backend)

---

## 1. Website Frontend (`https://inexocast.in`)

Copy the compiled `dist` folder from `inexo-website/dist` to your server (e.g., `/var/www/inexo-website/dist`).

```nginx
server {
    listen 80;
    server_name inexocast.in;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name inexocast.in;

    # SSL Configuration (Replace with your certificate paths)
    ssl_certificate /etc/letsencrypt/live/inexocast.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/inexocast.in/privkey.pem;

    root /var/www/inexo-website/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy uploads requests to the backend server
    location /uploads {
        proxy_pass http://127.0.0.1:4000/uploads;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

---

## 2. Admin Portal (`https://admin.inexocast.in`)

Copy the compiled `dist` folder from `inexo-admin-portal/dist` to your server (e.g., `/var/www/inexo-admin-portal/dist`).

```nginx
server {
    listen 80;
    server_name admin.inexocast.in;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name admin.inexocast.in;

    # SSL Configuration (Replace with your certificate paths)
    ssl_certificate /etc/letsencrypt/live/admin.inexocast.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/admin.inexocast.in/privkey.pem;

    root /var/www/inexo-admin-portal/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy uploads requests to the backend server
    location /uploads {
        proxy_pass http://127.0.0.1:4000/uploads;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

---

## 3. API Server (`https://api.inexocast.in`)

Proxies API routes and backend services running locally (default port `4000`).

```nginx
server {
    listen 80;
    server_name api.inexocast.in;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name api.inexocast.in;

    # SSL Configuration (Replace with your certificate paths)
    ssl_certificate /etc/letsencrypt/live/api.inexocast.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.inexocast.in/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Uploads Proxy Requirement

The database stores media/upload routes as relative paths (e.g. `/uploads/images/filename.jpg`). 
Since frontends render images with relative paths (`<img src={image} />`), you **must** include the Nginx `/uploads` proxy rule in the Frontend and Admin server blocks so the browser can load them correctly from the backend storage.
