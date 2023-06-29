const isDev = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: !isDev ? "export": undefined,
};

module.exports = nextConfig;
