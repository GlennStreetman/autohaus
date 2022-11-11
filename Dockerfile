FROM node:16-alpine AS installPack
RUN apk add --no-cache bash
WORKDIR /autohaus
COPY package*.json ./
RUN npm install
EXPOSE 3000
