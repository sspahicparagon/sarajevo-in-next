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
    TOKEN_SECRET: process.env.TOKEN_SECRET
  }
}

module.exports = nextConfig
