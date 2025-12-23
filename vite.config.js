// vite.config.js - Configuração do Vite
const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');

module.exports = defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist-react',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
});