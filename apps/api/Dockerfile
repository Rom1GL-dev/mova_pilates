# =========================
# 1. Base
# =========================
FROM node:23-alpine AS base

RUN apk add --no-cache openssl
WORKDIR /app

# =========================
# 2. Build
# =========================
FROM base AS builder

# Installer turbo
RUN yarn global add turbo

# Copier tout le monorepo
COPY . .

# Installer les dépendances
RUN yarn install --frozen-lockfile

# Générer Prisma pour la base de données
RUN yarn workspace @mova_pilates/database db:generate

# Builder uniquement l'API
RUN yarn turbo run build --filter=api...

# =========================
# 3. Production
# =========================
FROM node:23-alpine AS production
ARG PORT=3001
ENV PORT=$PORT

WORKDIR /app
RUN apk add --no-cache openssl

# Créer un user non-root
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nestjs
USER nestjs

# Copier le build complet depuis le builder
COPY --from=builder /app .

# 🔑 Copier explicitement le dossier Prisma du package database
COPY --from=builder /app/packages/database/prisma ./prisma

EXPOSE $PORT

# Lancer la migration Prisma avec le bon chemin puis l'app
CMD sh -c "npx prisma migrate deploy --schema=./prisma/schema.prisma && node apps/api/dist/main.js"
