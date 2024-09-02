/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'www.coderhouse.com',
        port: '',
        pathname: '/imgs/**', // Permite cualquier imagen bajo el subdirectorio /imgs/
      },
    ],
    domains: ['lh3.googleusercontent.com','encrypted-tbn0.gstatic.com'],
  },
};

export default nextConfig;
