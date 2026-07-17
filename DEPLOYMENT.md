# Deployment

1. Provision Ubuntu 24.04 LTS on a new server separate from `corecompass.ca`.
2. Point DNS `library.corecompass.ca` A/AAAA records to the new server.
3. Install Docker: `curl -fsSL https://get.docker.com | sudo sh`.
4. Create app directory: `sudo mkdir -p /opt/core-materials-library && sudo chown $USER:$USER /opt/core-materials-library`.
5. Clone this independent repository into that directory.
6. Copy environment file: `cp .env.example .env`; replace every `REPLACE_WITH...` value.
7. Firewall: `sudo ufw allow OpenSSH && sudo ufw allow 80/tcp && sudo ufw allow 443/tcp && sudo ufw enable`.
8. Initial HTTP start: `docker compose up -d db app nginx`.
9. Migrations: `docker compose run --rm app npx prisma migrate deploy`.
10. First admin: `docker compose run --rm app npm run setup:first-admin -- admin@corecompass.ca '<REPLACE_LONG_RANDOM_PASSWORD>' 'CORE Admin'`.
11. Certificate: run Certbot using the webroot volume, then `docker compose restart nginx`.
12. Verify: `curl -fsS https://library.corecompass.ca/api/health`.
13. Backups: add cron `15 2 * * * cd /opt/core-materials-library && set -a && . ./.env && set +a && ./scripts/backup.sh`.
14. Update: `git fetch --all && git checkout <RELEASE_TAG> && docker compose build app && docker compose run --rm app npx prisma migrate deploy && docker compose up -d`.
15. Rollback: `git checkout <PREVIOUS_RELEASE_TAG> && docker compose build app && docker compose up -d`; restore DB only if migrations require it.
16. Logs: `docker compose logs -f app nginx db`.
17. Restart: `docker compose restart app`.
18. Rotate secrets by editing `.env`, invalidating sessions when rotating `SESSION_SECRET`, and restarting containers.
