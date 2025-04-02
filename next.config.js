// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const nextConfig = {
  webpack: (config) => {
    config.resolve.modules.push(path.resolve('./src'));
    return config;
  },
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