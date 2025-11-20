const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./src/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // PWA configuration
  // Note: You'll need to add next-pwa plugin for full PWA support
}

module.exports = withNextIntl(nextConfig)
