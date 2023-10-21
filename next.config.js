/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' }
    ]
  },
  // async rewrites() {
  //   return {
  //     afterFiles: i18nRewriter(i18nConfig)
  //   };
  // }
}

module.exports = withBundleAnalyzer(nextConfig)
