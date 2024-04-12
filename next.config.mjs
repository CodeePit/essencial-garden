import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL.replace('https://', ''),
      },
    ],
  },
};

export default withNextVideo(nextConfig, { folder: 'src/videos' });