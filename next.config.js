/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack5: true,
    webpack: config => {
        config.resolve.fallback = {};

        // Tambahkan konfigurasi tambahan di sini jika diperlukan

        return config;
    }
    // Anda bisa menambahkan properti konfigurasi lainnya di sini
};

module.exports = nextConfig;
