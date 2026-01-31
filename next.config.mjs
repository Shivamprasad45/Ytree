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
      {
        // Cache static assets
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache fonts
        source: "/:all*(woff|woff2|ttf|otf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
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
      "picsum.photos",
      "tse2.mm.bing.net",
      "res.cloudinary.com",
      "res-console.cloudinary.com",
      "media.istockphoto.com",
      "placehold.co",
      "lh3.googleusercontent.com",
      "m.media-amazon.com",
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  compress: true,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  poweredByHeader: false,
};

export default nextConfig;
