/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
          'lh3.googleusercontent.com',
          'res.cloudinary.com', 
          'avatars.githubusercontent.com'
        ],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
      return config
    }
  }
  
  module.exports = nextConfig