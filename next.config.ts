import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    // Heading ids feed the "On this page" list and #anchor links.
    rehypePlugins: [rehypeSlug],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // Lets a production build run next to `bun run dev` without sharing .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default withMDX(nextConfig);
