/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['mohitbhole.com']
  },
  trailingSlash: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/experience': { page: '/experience' },
      '/resume': { page: '/resume' },
    }
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
