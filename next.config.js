/** @type {import('next').NextConfig} */

const { i18nRewriter } = require('next-i18n-router');
const i18nConfig = require('./i18n.config');

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  experimental: { optimizeCss: true },
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' }
    ]
  },
  async rewrites() {
    return {
      afterFiles: i18nRewriter(i18nConfig)
    };
  }
}

module.exports = nextConfig
