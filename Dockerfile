FROM node:16-alpine AS installPack
WORKDIR /app

COPY . .
RUN npm install
EXPOSE 3000


# COPY next.config.js ./
# COPY next-env.d.ts ./
# COPY postcss.config.js /app/postcss.config
# COPY tailwind.config.js /app/tailwind.config.js
# COPY tsconfig.json /app/tsconfig.json
# COPY package.json ./
# COPY package-lock.json ./