const withPWAInit = require("next-pwa");

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

/** @type {import('next-pwa').PWAConfig} */
const withPWA = withPWAInit({
  dest: 'public',
  fallbacks: {
    document: 'app/~offline/page.tsx'
  }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' }
    ]
  }
}

module.exports = withPWA(nextConfig)
