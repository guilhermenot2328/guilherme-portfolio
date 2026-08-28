import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Esconde o indicador flutuante de dev tools do Next (o "N" no canto).
  // Ele so aparece em `next dev` — o build de producao nunca o renderiza.
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default nextConfig;
