import { defineConfig } from '@solidjs/start/config';

export default defineConfig({
  ssr: false,
  server: {
    preset: 'bun',
  },
});
