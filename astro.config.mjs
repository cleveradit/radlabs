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
    // Blok kode: tema `css-variables` menulis warna sebagai var(--astro-
    // code-*), bukan hex tetap. Variabel itu dipetakan ke token situs di
    // global.css, jadi blok kode ikut tema terang/gelap dan ikut palet.
    shikiConfig: { theme: 'css-variables' },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],
});
