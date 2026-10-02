import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  async redirects() {
    // shoirly.ie -> shoirly.com is handled at the DNS / Vercel domain level.
    return [{ source: "/book", destination: "/demo", permanent: true }];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
