/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  BASE_URL: process.env.NODE_ENV == 'production'
    ? process.env.BASE_URL
    : "http://localhost:3000",
  webpack: (config, { nextRuntime }) => {
    if (nextRuntime === 'nodejs') return config;

    return {
      ...config
    }
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    BASE_URL: process.env.BASE_URL,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    FILE_URL: process.env.FILE_URL,
    GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY
  },
  images: {
    minimumCacheTTL: 180,
    domains: ['sarajevoin.ba'],
    loader: 'custom',
    loaderFile: './lib/imageLoader.ts'
  }
}

module.exports = nextConfig
