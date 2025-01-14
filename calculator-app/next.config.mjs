/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  // Disable server-side features for static export
  trailingSlash: true,
  reactStrictMode: true
}

export default nextConfig;
