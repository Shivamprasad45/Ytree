/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://greenfatuer.vercel.app, http://localhost:3000", // Allow specific domains
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,HEAD,OPTIONS,POST,PUT,DELETE",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, X-Requested-With, Accept",
          },
        ],
      },
    ];
  },
  images: {
    domains: [
      "cdn.pixabay.com",
      "dummyimage.com",
      "img.freepik.com",
      "images.unsplash.com",
    ],
  },
};

export default nextConfig;
