// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['hotoffers.casino', 'gobig.finance', 'trckln.com'],
  },
  swcMinify: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Исключаем модули, которые Knex пытается загрузить на клиенте
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        oracledb: false,
        pg: false,
        'pg-query-stream': false,
        sqlite3: false,
        tedious: false,
        better_sqlite3: false,
        mysql: false,
      };
    }

    return config;
  },
}

module.exports = nextConfig;
