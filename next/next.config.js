/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: `/`,
        destination: `/wiki/main`,
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
};
