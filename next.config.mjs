/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    TMDB_BASE_URL: process.env.TMDB_BASE_URL,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    TMDB_TOKEN: process.env.TMDB_TOKEN,
    MONGO_DB_URL: process.env.MONGO_DB_URL,
  },
  images: { remotePatterns: [{ hostname: "image.tmdb.org" }] },
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
