/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [320, 480, 640, 768, 1024, 1280, 1536],
  },
};

export default nextConfig;
