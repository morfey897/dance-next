/** @type {import('next').NextConfig} */

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

module.exports = nextConfig
