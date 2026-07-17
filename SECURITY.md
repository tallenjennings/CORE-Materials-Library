# Security

Production secrets are supplied only through environment variables and `.env` is excluded from Git. Passwords are hashed with Argon2id. Server-side authorization checks must protect every state-changing route. Uploads are limited to image MIME types and size limits before storage. Nginx terminates HTTPS and sets security headers.
