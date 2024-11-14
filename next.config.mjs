/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "silaaimachines.com",
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
      "192.168.29.181",
    ],
  },
  /* output: "export", */
};

export default nextConfig;
