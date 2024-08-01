/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
  images: {
    domains: ["res.cloudinary.com", "static.wikia.nocookie.net"],
  },
};

export default nextConfig;
