FROM node:16-alpine AS installPack
WORKDIR /app

COPY . .
RUN npm install
EXPOSE 3000
