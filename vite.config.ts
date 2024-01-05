import { defineConfig } from '@solidjs/start/config';

export default defineConfig({
  start: { server: { preset: 'bun' }, ssr: false },
  ssr: {
    noExternal:
      process.env.NODE_ENV === 'development'
        ? []
        : ['elysia', 'memoirist', '@sinclair/typebox'],
  },
});
