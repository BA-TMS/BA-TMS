import path from 'path';

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

export default nextConfig;