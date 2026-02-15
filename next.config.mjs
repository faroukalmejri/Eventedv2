/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed ignoreBuildErrors to catch issues during build
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.newmetrics.net",
      },
    ],
  },
}

export default nextConfig
