import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import {createHtmlPlugin} from "vite-plugin-html";
import {inject} from "vue";

export default defineConfig({
    base: './',
    build: {
        outDir: 'dist',

    },
    plugins: [
        vue(),
        createHtmlPlugin({
                inject: {
                    data: {
                        title: 'Mall',
                    }
                }
            }
        )
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8082',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
                configure: (proxy, options) => {

                }
            }
        },
        hmr: true,
        port: 8888
    },
})