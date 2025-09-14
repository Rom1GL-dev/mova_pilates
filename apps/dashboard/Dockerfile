FROM node:23-alpine AS base

FROM base AS builder
RUN apk add --no-cache openssl
RUN yarn global add turbo

WORKDIR /app
COPY . .
RUN turbo prune dashboard --docker

FROM base AS installer
WORKDIR /app
RUN apk add --no-cache openssl

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN yarn turbo run build --filter=dashboard...

FROM base AS production
ARG PORT=3000
ENV PORT=$PORT

WORKDIR /app
RUN apk add --no-cache openssl

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 react
USER react

COPY --from=installer --chown=nodejs:react /app .

EXPOSE $PORT
CMD ["serve", "-s", "apps/dashboard/dist", "-l", "3000"]
