/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['hackmd.io'],
    },
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: /\.tex$/,
        use: 'raw-loader',
      });
      return config;
    },
  };
  
  export default nextConfig;