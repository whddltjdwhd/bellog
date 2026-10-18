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
      // react-notion-x 8.x는 Notion 이미지를 app.notion.com/image 프록시로 매핑하고,
      // 이 프록시는 img.notionusercontent.com으로 리다이렉트한다.
      { protocol: "https", hostname: "app.notion.com" },
      { protocol: "https", hostname: "file.notion.com" },
      { protocol: "https", hostname: "img.notionusercontent.com" },
    ],
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;