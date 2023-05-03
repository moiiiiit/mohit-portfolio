/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['mohitbhole.com']
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/experience': { page: '/experience' },
      '/resume': { page: '/resume' },
      '/life': { page: '/life' },
    }
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
