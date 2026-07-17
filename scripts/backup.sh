#!/usr/bin/env bash
set -euo pipefail
: "${POSTGRES_USER:?}" "${POSTGRES_DB:?}" "${BACKUP_DIR:?}" "${BACKUP_RETENTION_DAYS:=30}"
ts=$(date -u +%Y%m%dT%H%M%SZ); mkdir -p "$BACKUP_DIR"
docker compose exec -T db pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" | gzip > "$BACKUP_DIR/db-$ts.sql.gz"
if docker volume inspect core-materials-library_uploads >/dev/null 2>&1; then docker run --rm -v core-materials-library_uploads:/uploads:ro -v "$BACKUP_DIR":/backup alpine tar -czf "/backup/uploads-$ts.tar.gz" -C / uploads; fi
find "$BACKUP_DIR" -type f -mtime +"$BACKUP_RETENTION_DAYS" -delete
