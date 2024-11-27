/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Allow HTTPS
        hostname: "**", // Match all hostnames
      },
    ],
  },
};

export default nextConfig;
