const uuid = require('uuid');

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' }
    ]
  },
  env: {
    NEXT_PUBLIC_BUILD_ID: uuid.v4()
  }
  // async rewrites() {
  //   return [{
  //     source: '/',
  //     destination: '/uk/'
  //   }];
  // }
}

module.exports = withBundleAnalyzer(nextConfig)
