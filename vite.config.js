import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'index.js'),
            name: 'dcui',
            fileName: (format) => `dc-ui.${format}.js`,
        },
        rollupOptions: {
            external: ['vue', 'element-plus'],
            output: {
                globals: {
                    vue: 'Vue',
                    'element-plus': 'ElementPlus',
                },
            },
        },
        // 👇 关键配置：让 console.log 保留
        minify: 'esbuild',
        // 👇 禁用自动删除 console.log
        terserOptions: undefined,
        esbuild: {
            drop: [], // 默认是 ['console', 'debugger']
        },
    },
});
