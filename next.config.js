/** @type {import('next').NextConfig} */
const { withKeystone } = require("@keystone-6/core/next");
const nextConfig = {
  reactStrictMode: true,
  env: {
    SESSION_SECRET: process.env.SESSION_SECRET
  }
}

module.exports = withKeystone(nextConfig)
