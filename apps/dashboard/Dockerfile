# Étape de base
FROM node:23-alpine AS base

# ----- 1. Build -----
FROM base AS builder
RUN apk add --no-cache openssl
RUN yarn global add turbo

WORKDIR /app
COPY . .
RUN turbo prune dashboard --docker

# ----- 2. Installer les deps + build -----
FROM base AS installer
WORKDIR /app
RUN apk add --no-cache openssl

# Arguments passés au build pour Vite
ARG VITE_API_URL
ARG VITE_APP_URL
# On les exporte comme ENV pour qu’ils soient visibles pendant le build Vite
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_APP_URL=$VITE_APP_URL

# copier les fichiers prunés
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile

COPY --from=builder /app/out/full/ .
# ⚡ le build Vite lira VITE_* via ENV
RUN yarn turbo run build --filter=dashboard...

# ----- 3. Image finale -----
FROM base AS production
ARG PORT=3000
ENV PORT=$PORT

# ➜ exposer les mêmes variables si tu veux les retrouver au runtime (facultatif)
ARG VITE_API_URL
ARG VITE_APP_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_APP_URL=$VITE_APP_URL

WORKDIR /app
RUN apk add --no-cache openssl

# créer user non-root
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 react
USER react

# copier uniquement le résultat et node_modules
COPY --from=installer --chown=nodejs:react /app .

EXPOSE $PORT
# ➜ on lance via npx pour utiliser la dépendance locale "serve"
CMD ["npx", "serve", "-s", "apps/dashboard/dist", "-l", "3000"]
