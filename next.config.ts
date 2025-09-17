import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow .mdx extensions for files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      new URL("https://www.notion.so/**"),
      new URL("https://images.unsplash.com/**"),
      new URL("https://abs.twimg.com/**"),
      new URL("https://pbs.twimg.com/**"),
      new URL("https://s3.us-west-2.amazonaws.com/**"),
      new URL("https://s3.amazonaws.com/**"),
      new URL("https://lh3.googleusercontent.com/**"),
    ],
  },
};

module.exports = nextConfig;
