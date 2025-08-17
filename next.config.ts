import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // não roda eslint no build do Vercel
  },
};

export default nextConfig;
