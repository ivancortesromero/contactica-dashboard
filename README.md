i# WordPress Dashboard Integration

# Registered WordPress Custom Fields

The project includes a preconfigured `functions.php` file containing:

- custom REST fields
- custom user meta registration
- WordPress REST API extensions

This file must be copied into the WordPress container.

Example command:

```bash
docker cp ./wordpress/functions.php wordpress_app:/var/www/html/wp-content/themes/twentytwentyfive/functions.php
```
---
## Running the Project

Start all services:

```bash
docker-compose up
```

This will start:

- Next.js frontend
- Express API
- WordPress
- MySQL

---

# Service URLs

## Frontend

```txt
http://localhost:3000
```

---

## WordPress

```txt
http://localhost:8080
```

---

## WordPress Admin

```txt
http://localhost:8080/wp-admin
```

---

# Initial WordPress Setup

After opening WordPress for the first time:

1. Complete the WordPress installation flow.
2. Create an administrator user.
3. IMPORTANT: remember the username and password.

The same administrator account will later be used for:

- WordPress REST API authentication
- Application Password generation
- Express environment variables

---

# Configure Permalinks

Inside WordPress Admin:

```txt
Settings → Permalinks
```

Select:

```txt
Post name
```

This step is REQUIRED.

Without pretty permalinks, REST API routes may fail.

---

# Create Application Password

Inside WordPress Admin:

```txt
Users → Profile
```

Scroll to:

```txt
Application Passwords
```

Create a new application password.

Example:

```txt
dashboard-api
```

WordPress will generate something like:

```txt
abcd efgh ijkl mnop qrst uvwx
```

Copy this password immediately.

It will be used by the Express API.

---

# Express Environment Variables

Create a `.env` file for the API service.

Example:

```env
WORDPRESS_USERNAME=your_admin_username
WORDPRESS_PASSWORD=your_application_password
```

IMPORTANT:

- `WORDPRESS_USERNAME` MUST be the administrator username created during WordPress setup.
- Using another user without administrator permissions may cause REST API failures.

---

# WordPress REST API Validation

## Test base REST API

```txt
http://localhost:8080/wp-json
```

If this route fails:

- verify permalinks are enabled
- verify WordPress container is healthy

---

## Test users endpoint

```txt
http://localhost:8080/wp-json/wp/v2/users
```

---

# Common Issues

## 1. `401 Unauthorized`

Cause:

- wrong application password
- wrong username
- non-admin user

Solution:

- regenerate Application Password
- verify admin user credentials
- verify `.env`

---

## 2. `Application Passwords requires HTTPS`

Cause:

WordPress blocks Application Passwords unless environment type allows development usage.

Solution:

Ensure WordPress environment type supports local development.

---

## 3. `/wp-json` returns 404

Cause:

Permalinks not configured.

Solution:

```txt
Settings → Permalinks → Post name
```

---

## 4. Missing fields in `/users`

By default WordPress does NOT expose fields like:

- telephone
- verified
- roles
- joined
- email (sometimes)

These fields must be registered manually in:

```txt
wp-content/themes/<theme>/functions.php
```

---


# CRUD Operations

The dashboard supports:

- Read users
- Create users
- Update users
- Delete users

through the Express API layer connected to WordPress REST API.