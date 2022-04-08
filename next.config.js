const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPlugins([
  [withBundleAnalyzer],
  [
    withPWA,
    {
      ...nextConfig,
      pwa: {
        dest: "public",
        disable: process.env.NODE_ENV === "development",
      },
    },
  ],
]);
