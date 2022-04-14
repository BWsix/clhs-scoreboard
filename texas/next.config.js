const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withTM = require("next-transpile-modules")(["@clhs-scoreboard/lappland"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/portal",
        destination: "https://eschool.clhs.tyc.edu.tw/online/",
        permanent: false,
        basePath: false,
      },
    ];
  },
};

module.exports = withPlugins([
  [withTM],
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
