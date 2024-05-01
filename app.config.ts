import { defineConfig } from '@solidjs/start/config';

export default defineConfig({
  server: {
    preset: 'bun',
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },
});
