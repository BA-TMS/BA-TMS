

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

export default nextConfig;