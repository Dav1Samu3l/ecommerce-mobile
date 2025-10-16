/** @type {import('next').NextConfig} */
const nextConfig = {
    // Desabilita verificações durante o build
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    // Configurações para imagens externas
    images: {
        domains: ['images.unsplash.com'],
        unoptimized: true // Para deploy estático na Vercel
    }
}

module.exports = nextConfig