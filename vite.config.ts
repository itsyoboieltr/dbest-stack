import { defineConfig } from '@solidjs/start/config';

export default defineConfig({
  start: { server: { preset: 'bun' }, ssr: false },
});
