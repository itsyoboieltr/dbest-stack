import type { Options } from 'prettier';

export default {
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSameLine: true,
  plugins: ['prettier-plugin-tailwindcss'],
} satisfies Options;
