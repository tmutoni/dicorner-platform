/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/landing-v3',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;