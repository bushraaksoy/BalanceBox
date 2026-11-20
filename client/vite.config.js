import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    preview: {
        port: 8080,
        host: true,
        allowedHosts: ['balanceboxclient.onrender.com'],
    },
    plugins: [react(), tailwindcss()],
});
