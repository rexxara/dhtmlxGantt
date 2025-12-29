import { defineConfig } from 'vite';
import { dynamicBasePlugin } from './vite-plugin-dynamic-base.js';

export default defineConfig(({ command }) => {
  return {
    build: {
      assetsInlineLimit: 4096,
      rollupOptions: {
        input: {
          main: 'src/Index.ts',
        },
        output: {
          format: 'iife' as const,
          entryFileNames: 'FrontEndModule.js',
        },
      },
    },
    plugins: [dynamicBasePlugin()],

    base: command === 'serve' ? '/Forguncy/' : './',
  };
});
