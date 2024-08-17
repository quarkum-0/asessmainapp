/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'dytu58v746btq.cloudfront.net',
        port: '',
        pathname: '**',
      }
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
