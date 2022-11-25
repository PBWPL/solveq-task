FROM node:16.15-bullseye as base

WORKDIR /app

COPY package.json package-lock.json tsconfig.json /app/

# production
FROM base as prod

COPY build /app/build

RUN npm ci --omit=dev

# development
FROM base as dev

COPY src /app/src

RUN npm i