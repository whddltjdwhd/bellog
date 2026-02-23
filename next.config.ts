/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.notion.so" },
      { protocol: "https", hostname: "notion.so" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "abs.twimg.com" },
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "s3.us-west-2.amazonaws.com" },
      { 
        protocol: "https", 
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com" 
      },
      { 
        protocol: "https", 
        hostname: "file.notion.so" 
      },
    ],
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;