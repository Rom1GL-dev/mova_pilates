# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MOVA Pilates is a monorepo for a pilates studio management system with course booking, pack purchasing, and user management. Uses Turborepo with Yarn workspaces.

## Common Commands

```bash
# Development
yarn dev                    # Start all apps (API + Dashboard)
yarn build                  # Build all apps and packages
yarn lint                   # Lint all packages
yarn format                 # Format code with Prettier

# Database (from root or packages/database)
yarn db:generate            # Generate Prisma client
yarn db:migrate:dev         # Run migrations in development
yarn db:migrate:deploy      # Deploy migrations (production)
yarn db:push                # Push schema changes without migration
yarn db:seed                # Seed database

# Docker (local development infrastructure)
make start                  # Start PostgreSQL + Redis containers
make stop                   # Stop containers
make logs                   # View container logs

# App-specific
cd apps/api && yarn test            # Run API tests
cd apps/api && yarn test:watch      # Run tests in watch mode
cd apps/api && yarn test:e2e        # Run E2E tests
cd apps/dashboard && yarn preview   # Preview production build
```

## Architecture

### Monorepo Structure
- `apps/api` - NestJS REST API (backend)
- `apps/dashboard` - Vite + React admin dashboard
- `packages/database` - Prisma schema and client (@mova_pilates/database)
- `packages/shared` - Shared types and Zod schemas (@mova_pilates/shared)

### Backend (apps/api)
NestJS with Clean Architecture pattern:
- `src/modules/` - Feature modules (auth, user, session, pack, reservation, wallet, orders, etc.)
- Each module follows: `domain/` (repositories), `infrastructure/` (Prisma implementations), `usecases/` (controllers + services)
- `src/shared/` - Global services: PrismaService, MailerService, StripeService, RedisCacheStorage
- Authentication via cookie-based sessions with SessionMiddleware
- Role-based access control via RolesGuard (USER, ADMIN roles)

### Frontend (apps/dashboard)
React 19 + Vite with:
- `src/app/` - Router and route components
- `src/features/` - Feature modules mirroring backend (auth, user, session, pack, orders, etc.)
- `src/components/ui/` - Radix UI + shadcn/ui components
- `src/lib/api.ts` - Axios instance with cookie credentials
- `src/lib/auth.tsx` - AuthProvider and ProtectedRoute
- State: React Query for server state, MobX available
- Styling: Tailwind CSS v4

### Database
PostgreSQL with Prisma ORM. Key models:
- User (roles: USER, ADMIN)
- TypeCourse → Pack (pricing) → Order (payments)
- Session → Reservation (bookings)
- Wallet (course credits per user per course type)

## Environment Variables

Required in `.env`:
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection for session cache
- `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_NAME` - For Docker
- `REDIS_PASSWORD` - For Docker Redis

Dashboard needs `API_URL` pointing to the backend.

## API Conventions

- Backend routes prefixed with `/v1/backoffice/` for admin dashboard
- Mobile routes prefixed with `/v1/` (no backoffice)
- Auth check: `GET /v1/backoffice/auth/me`
