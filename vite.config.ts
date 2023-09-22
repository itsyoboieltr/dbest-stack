import solid from 'solid-start/vite';
import bun from 'solid-start-bun';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [solid({ adapter: bun() })],
});
