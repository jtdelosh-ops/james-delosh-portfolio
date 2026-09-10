import { defineConfig } from 'astro/config';

// Set SITE_URL to the approved public origin before a production build.
const site = process.env.SITE_URL;
export default defineConfig({
  ...(site ? { site } : {}),
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
