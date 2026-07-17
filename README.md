# CORE Materials Library

Independent Next.js/PostgreSQL application for tracking CORE Compass activity and supply bins at `https://library.corecompass.ca`.

## Implementation plan and assumptions

1. Next.js App Router, TypeScript, Prisma, PostgreSQL, Tailwind, Vitest, Playwright, Docker Compose, and Nginx.
2. Session-based authentication is implemented with Argon2 password hashes, HTTP-only cookies, and database sessions.
3. Quadrants, cells, locations, storage areas, categories, and assignments are database records, not hard-coded inventory rules.
4. Bin cell capacity and cell meanings are intentionally unrestricted.
5. Requests and physical transfers are separate models; transfer start and arrival must be transactional in service code.
6. This repository is standalone and contains no dependency on `corecompass.ca`.

Development-only seeded passwords use `development-only-password` and must never be used in production.

## Quick start

```bash
cp .env.example .env
# edit .env secrets
npm install
npx prisma migrate dev
npm run prisma:seed
npm run dev
```

## Tests

```bash
npm run typecheck
npm test
npm run test:e2e
```
