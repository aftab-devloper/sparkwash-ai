import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico'],
            manifest: {
                name: 'SparkWash',
                short_name: 'SparkWash',
                description: 'AI-Powered Car Washing Booking Platform',
                theme_color: '#38bdf8',
                background_color: '#04070f',
                display: 'standalone',
                orientation: 'portrait',
                scope: '/',
                start_url: '/',
                icons: [
                    {
                        src: '/images/icon-192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/images/icon-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
        }),
        viteImagemin({
            gifsicle: { optimizationLevel: 7 },
            optipng: { optimizationLevel: 7 },
            mozjpeg: { quality: 80 },
            pngquant: { quality: [0.8, 0.9], speed: 4 },
            svgo: {
                plugins: [
                    { name: 'removeViewBox' },
                    { name: 'removeEmptyAttrs', active: false },
                ],
            },
            webp: { quality: 80 },
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom'],
                    'inertia-vendor': ['@inertiajs/react'],
                    'gsap-vendor': ['gsap'],
                },
            },
        },
        chunkSizeWarningLimit: 1000,
    },
});