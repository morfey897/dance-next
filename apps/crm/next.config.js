const withPWAInit = require("@ducanh2912/next-pwa");

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

/** @type {import('next-pwa').PWAConfig} */
const withPWA = withPWAInit.default({
  dest: 'public',
  disable: process.env.NODE_ENV !== "production",
  fallbacks: {
    document: "/~offline",
  }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    remotePatterns: [
      { hostname: 'images.unsplash.com' }
    ]
  }
}

module.exports = withPWA(nextConfig)
