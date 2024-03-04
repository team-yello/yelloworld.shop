/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  logging: {
    fetches: {
      fullUrl: false,
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
