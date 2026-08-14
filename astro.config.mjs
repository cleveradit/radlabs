// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';

import { satteriFigurePlugin } from './src/plugins/satteri-figure.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://radlabs.my.id',

  markdown: {
    // Sätteri adalah prosesor Markdown bawaan Astro 7; di sini hanya
    // ditambahi satu plugin agar setiap gambar terbungkus figure berbingkai
    // dan setiap tabel bisa di-scroll. Berlaku untuk semua konten Markdown.
    processor: satteri({ hastPlugins: [satteriFigurePlugin] }),
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],
});
