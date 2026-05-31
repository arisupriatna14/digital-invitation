/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "placehold.co" },
      { hostname: "via.placeholder.com" },
    ],
  },
};

export default nextConfig;
