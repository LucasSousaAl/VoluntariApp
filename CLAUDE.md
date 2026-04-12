# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

VoluntariApp is a Next.js 13 web app (PWA) that connects volunteers to social causes (ONGs). Users register as either `volunteer` or `ong`, and ONGs can post work opportunities ("trabalhos"/"vagas") that volunteers can apply to.

## Commands

```bash
# Development (starts Docker DB + Next.js dev server)
npm run dev

# Docker services only
npm run services:up
npm run services:down

# Database migrations
npm run migration:create   # creates a new migration file
npm run migration:up       # applies pending migrations
npm run migration:down     # rolls back last migration

# Linting (Prettier)
npm run lint:check
npm run lint:fix

# Tests
npm test                   # run all tests (serial)
npm run test:watch         # watch mode
```

## Architecture

### Tech Stack
- **Next.js 13** (Pages Router) with TypeScript
- **PostgreSQL** via the `pg` driver — no ORM, raw SQL queries
- **Ant Design** for UI components
- **JWT (jose)** for auth, stored in HttpOnly cookies
- **web-push** for PWA push notifications
- **node-pg-migrate** for database migrations

### Directory Layout

```
infra/          # Server-side infrastructure modules
  database.ts   # pg Client wrapper (creates a new client per query)
  middleware.ts  # withAuth / withRole HOFs for API route protection
  jwt.ts         # generateToken / verifyToken (jose)
  password.ts    # hashPassword / comparePassword (bcrypt)
  core.ts        # CORS helper
  pushService.ts # web-push notification sender
  migrations/    # node-pg-migrate migration files

controllers/    # Business logic separated from Next.js API routes
  auth.ts        # register / login / logout handlers

models/
  usuario.ts     # DB queries for the usuarios table (findByEmail, create)

pages/
  api/v1/        # All API routes under /api/v1/
    auth/        # login, logout, register, me
    trabalho/    # CRUD for trabalhos (vagas); also apply/ and quit/
    ong/         # ONG CRUD
    usuario/     # User CRUD
    notifications/ # Push subscription management
    migrations/  # Exposes migration endpoint
    status/      # Health check
  (frontend pages)

context/
  AppContext.tsx  # Global React context: current user, selected vaga, user role

hooks/
  usePushNotifications.ts

worker/          # Service worker for PWA offline support
```

### Auth Flow
- JWT stored as `HttpOnly` cookie (`token`)
- `middleware.ts` (Next.js edge middleware) guards `/home`, `/profile`, `/ong`, `/vaga`, `/form`, and `/` — redirects to `/login` if unauthenticated
- API routes use `withAuth` / `withRole` HOFs from `infra/middleware.ts`
- Token also accepted via `Authorization: Bearer <token>` header

### Database
- Postgres runs on port **6666** in development (mapped from container's 5432)
- Each query opens and closes a new `pg.Client` — no connection pooling
- `infra/database.ts` returns `res.rows` directly
- Migrations live in `infra/migrations/` and are run with `node-pg-migrate`

### Roles
Two user roles: `volunteer` and `ong`. Role is stored in the JWT payload and in the `usuarios` table. `withRole('ong')` restricts certain API routes to ONG users.

### PWA
- Configured with `next-pwa`
- Push notification subscriptions stored in `push_subscriptions` table
- `infra/pushService.ts` sends to all subscribers (or a specific user) and auto-deletes stale subscriptions (410/404 responses)

### Module Resolution
`moduleDirectories: ['node_modules', '<rootDir>/']` in `jest.config.js` enables bare imports like `import database from 'infra/database'` (no relative paths needed from project root).
