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
  // Remove these lines:
  // trailingSlash: true,
  // skipTrailingSlashRedirect: true,
  // output: 'export',
  // distDir: 'out',
}

module.exports = nextConfig
