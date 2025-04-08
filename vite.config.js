import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'index.js'),
            name: 'DcUiLib',
            fileName: (format) => `dc-ui-lib.${format}.js`,
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
    },
});
