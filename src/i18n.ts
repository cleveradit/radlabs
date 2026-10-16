import { getCollection } from "astro:content";
import { frontmatter as siteId } from "../content/id/site.md";
import { frontmatter as siteEn } from "../content/en/site.md";

// Bahasa default tanpa prefiks ("/"), bahasa lain di bawah prefiksnya
// ("/en/"). Slug penelitian sama di semua bahasa, jadi halaman padanan
// cukup diturunkan dari path.
export const langs = ["id", "en"] as const;
export type Lang = (typeof langs)[number];
export const defaultLang: Lang = "id";

const sites: Record<Lang, Record<string, any>> = { id: siteId, en: siteEn };

export const getSite = (lang: Lang) => sites[lang];

export const otherLang = (lang: Lang): Lang => (lang === "id" ? "en" : "id");

/** Path "/..." untuk bahasa tertentu. `path` selalu diawali "/". */
export const localePath = (lang: Lang, path = "/") =>
  lang === defaultLang ? path : `/${lang}${path}`;

export async function getPenelitian(lang: Lang) {
  const entries = await getCollection("penelitian", (e) =>
    e.id.startsWith(`${lang}/`),
  );
  return entries.sort((a, b) => a.data.order - b.data.order);
}

/** Nomor katalog penelitian, diturunkan dari `order`: "P-01". */
export const catalog = (prefix: string, order: number) =>
  `${prefix}${String(order).padStart(2, "0")}`;

/** Ganti {kunci} di string konten dengan nilai yang dihitung. */
export const fill = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (m, k) => (k in values ? String(values[k]) : m));

/**
 * Teks konten boleh menandai penekanan dengan **...**. Hasilnya HTML
 * untuk `set:html`: teks di-escape dulu, baru penanda diubah ke <strong>.
 */
export const inline = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
