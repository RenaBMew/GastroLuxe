/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "spoonacular.com",
        pathname: "/recipeImages/**",
      },
    ],
  },
};

export default nextConfig;
