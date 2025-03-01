const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 静态导出
};

module.exports = withNextIntl(nextConfig);
