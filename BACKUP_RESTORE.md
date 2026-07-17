# Backup and restore

Backups are created by `scripts/backup.sh` as timestamped compressed PostgreSQL dumps and uploaded-file archives in `BACKUP_DIR`.

## Backup

```bash
set -a; . ./.env; set +a
./scripts/backup.sh
```

## Restore database

```bash
docker compose down app
zcat /path/to/db-YYYYMMDDTHHMMSSZ.sql.gz | docker compose exec -T db psql -U "$POSTGRES_USER" "$POSTGRES_DB"
docker compose up -d app
```

## Restore uploads

```bash
docker run --rm -v core-materials-library_uploads:/uploads -v /path/to/backups:/backup alpine sh -c 'rm -rf /uploads/* && tar -xzf /backup/uploads-YYYYMMDDTHHMMSSZ.tar.gz -C /'
```
