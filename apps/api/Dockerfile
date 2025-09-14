FROM node:23-alpine AS base

RUN apk add --no-cache openssl
RUN yarn global add turbo

WORKDIR /app

# Copier tout le monorepo
COPY . .

# Installer toutes les dépendances et lier les workspaces
RUN yarn install --frozen-lockfile

# Générer Prisma pour la base de données
RUN yarn workspace @mova_pilates/database db:generate

# Build API uniquement
RUN yarn turbo run build --filter=api...

# =========================
# Production
# =========================
FROM node:23-alpine AS production
ARG PORT=3001
ENV PORT=$PORT

WORKDIR /app
RUN apk add --no-cache openssl

# User non-root
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nestjs
USER nestjs

# Copier le build complet depuis le builder
COPY --from=0 /app .

EXPOSE $PORT
CMD sh -c "yarn workspace @mova_pilates/database db:migrate:deploy && node apps/api/dist/main.js"
