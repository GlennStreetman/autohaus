/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: [process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_URL_DOMAIN, process.env.NEXT_PUBLIC_STRAPI_BUCKET_URL],
    },
};

module.exports = nextConfig;
