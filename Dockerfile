FROM node:16-alpine AS dev
RUN apk add --no-cache bash
WORKDIR /autohaus
COPY package*.json ./
RUN npm ci
EXPOSE 3000