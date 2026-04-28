import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Desabilitar durante builds de desenvolvimento
    // Habilitar no Vercel (CI/CD)
    ignoreDuringBuilds: process.env.CI !== 'true',
  },
};

export default nextConfig;