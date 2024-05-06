/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      // redirect / to dashboard
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
