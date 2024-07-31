/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      // redirect / to dispatch
      {
        source: '/',
        destination: '/dispatch',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
