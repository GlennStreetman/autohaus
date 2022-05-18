/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: [process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_URL_DOMAIN],
    },
    pwa: {
        dest: "public",
        register: true,
        skipWaiting: true,
    },
};

module.exports = nextConfig;
