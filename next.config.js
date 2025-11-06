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
  // Add this to disable SSG for dynamic pages
  output: 'standalone',
  // Disable static generation for auth-dependent pages
  trailingSlash: true,
}

module.exports = nextConfig
