/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
      {
        // specific route for tree global
        source: "/Tree/Global",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
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
      "cdn.usegalileo.ai",
      "via.placeholder.com",
      "i.postimg.cc",
      "cdn.tuk.dev",
      "i.ibb.co",
      'picsum.photos',
      'tse2.mm.bing.net'
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
