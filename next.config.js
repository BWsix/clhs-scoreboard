const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPWA({
  ...nextConfig,
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },
});
