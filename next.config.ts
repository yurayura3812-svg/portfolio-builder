import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.11.3', 'localhost:3000'],
  // ビルドしたときにHTML/CSSとして書き出す設定
  output: 'export'
};

export default nextConfig;
