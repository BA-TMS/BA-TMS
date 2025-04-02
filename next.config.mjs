/** @type {import('next').NextConfig} */

import nextra from 'nextra';

const withNextra = nextra({
  // ... Other Nextra config options
});

const nextConfig = {
  async redirects() {
    return [
      // redirect / to dashboard
      {
        source: '/',
        destination: '/dispatch',
        permanent: true,
      },
    ];
  },
};

// You can include other Next.js configuration options here, in addition to Nextra settings:
export default withNextra({
  ...nextConfig,
});
