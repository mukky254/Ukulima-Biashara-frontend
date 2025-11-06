
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'localhost'],
  },
  env: {
    API_URL: process.env.API_URL,
  },
  // Add these lines to fix the build
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  output: 'export',
  distDir: 'out',
}

module.exports = nextConfig
