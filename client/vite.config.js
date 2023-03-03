/* import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import jsConfigPaths from 'vite-jsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': './src',
        },
    },
    plugins: [react(), jsConfigPaths()],
    server: {
        open: true,
    },
}); */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import jsconfigPaths from 'vite-jsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    plugins: [react(), jsconfigPaths()],
    server: {
        open: true,
        proxy: {
            '/graphql': {
                target: 'http://localhost:3001/graphql',
                changeOrigin: true,
            },
        },
    },
    
});
