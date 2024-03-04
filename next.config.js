/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  compiler: {
    styledComponents: true,
  },
  experimental: {
    swcTraceProfiling: true,
  },
};

module.exports = nextConfig;
