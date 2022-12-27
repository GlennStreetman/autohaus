# SETUP

setup .env file using .example.env as reference
Set DATABASE_URL to reference external port number 5446

## Dev Mode

> npm run devdb
> npm run build
> npx run dBuild

## Production

Make sure your prod RDS db is running.
Make sure RDS permissions are setup.

> npm install
Set strapi connection strings to reference "localhost"


> npm run build

Set strapi connection strings to reference "autoStrapi" container name

> npm run pBuild
