/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "silaaimachines.com",
      "admin.silaaimachines.com",
      "192.168.29.181",
      "192.168.29.15",
    ],
  },
  /* output: "export", */
};

export default nextConfig;
