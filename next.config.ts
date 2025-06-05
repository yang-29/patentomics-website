import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/patentomics-website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/patentomics-website/' : '',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
