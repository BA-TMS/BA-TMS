/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      
      {
        source: '/',
        destination: '/dispatch',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
