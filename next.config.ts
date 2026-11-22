import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: process.env.CI !== 'true',
  },
  async redirects() {
    return [
      {
        source: '/colecoes',
        destination: '/selo-cronopios/acervo',
        permanent: true,
      },
      {
        source: '/colecoes/:id',
        destination: '/selo-cronopios/acervo/:id',
        permanent: true,
      },
      {
        source: '/publique-conosco',
        destination: '/selo-cronopios/publique-conosco',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
