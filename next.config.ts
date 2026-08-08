import type { NextConfig } from "next";

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  async redirects() {
    return [
      {
        source: '/cart',
        destination: '/',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/',
        permanent: true,
      },
      {
        source: '/products/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/collections',
        destination: '/',
        permanent: true,
      },
      {
        source: '/collections/:path*',
        destination: '/',
        permanent: true,
      }
    ];
  },
};

export default withPWA(nextConfig);
