/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Temporarily ignore TS errors
  },
  eslint: {
    ignoreDuringBuilds: true, // Temporarily ignore ESLint
  },
}

module.exports = nextConfig
