# SPEC.md — struktur situs

## Rute

| URL | Sumber |
|---|---|
| `/` | `src/pages/index.astro` + `content/id/site.md` |
| `/karya/[slug]` | digenerate dari koleksi `karya` |
| `/404` | halaman sederhana, tautan balik ke `/` |

Bahasa: Indonesia saja untuk sekarang. Folder `content/id/` sudah menyiapkan i18n nanti — **jangan bangun routing i18n sekarang.**

## Struktur folder target

```
src/
├── content/
│   ├── config.ts            ← skema koleksi
│   └── karya/               ← symlink/salinan dari content/id/*.md project
├── components/
│   ├── Manifest.astro
│   ├── KaryaCard.astro
│   ├── Figure.astro         ← bingkai screenshot
│   ├── ThemeToggle.astro
│   └── Section.astro
├── layouts/
│   └── Base.astro           ← head, meta, script anti-kedip, header, footer
└── pages/
    ├── index.astro
    ├── 404.astro
    └── karya/[slug].astro
public/
├── CNAME
├── images/ppdb/
└── favicon.png
```

Catatan: file case study ada di `content/id/`. Konfigurasikan koleksi Astro agar membacanya dari sana, atau salin saat build. Jangan duplikasi manual.

## Landing — lima seksi, urut

1. **Hero** — h1, lede, lalu blok manifest. Tanpa foto, tanpa tombol besar, tanpa animasi ketik.
2. **Karya** — eyebrow "Karya", lalu kartu.
3. **Cara saya bekerja** — 4 langkah. Penomoran `01–04` dibolehkan **hanya di seksi ini**, karena urutannya memang bermakna.
4. **Tentang** — foto profil kecil + 3–4 kalimat.
5. **Kontak** — tautan email, GitHub, LinkedIn dalam gaya manifest. **Tanpa form.** Tanpa Calendly, tanpa janji waktu respons.

Header: wordmark kiri, toggle tema kanan. Tanpa menu navigasi — halamannya cuma satu.

Footer: satu baris mono, tahun + nama.

## Anatomi kartu karya

Urut dari atas: judul (h3) → satu kalimat `summary` → tag stack → garis 1px → baris bawah berisi semua `metrics` (kiri) dan status repo (kanan).

Render **semua** `metrics` yang ada di frontmatter — jangan potong ke jumlah tetap. Di layar sempit, baris metrics membungkus ke baris kedua. Batas atas 4 metric supaya kartu tidak melar; kalau ada file konten yang butuh lebih, itu keputusan desain baru, bukan hal yang diam-diam dipotong.

Seluruh kartu adalah tautan ke `/karya/[slug]`. Hover: border berubah ke `--accent`. Tidak ada transform, tidak ada shadow.

**Status repo** dibaca dari field `repo`:
- berisi URL → label mono `↗ GitHub` sebagai tautan terpisah (`stopPropagation`, jangan nested `<a>`)
- `null` → label mono `Repositori privat`, warna `--muted`, bukan tautan

**Layout adaptif — penting:**
- 1 item → satu kartu selebar container, gambar `cover` ditampilkan di dalam kartu
- 2+ item → grid 2 kolom, `cover` tidak ditampilkan, kartu jadi ringkas
- Di bawah 720px → selalu satu kolom

Jangan render placeholder "coming soon" untuk slot kosong.

## Halaman detail

Urut: judul (h1) → `summary` sebagai lede → blok manifest (peran, tim, periode, status, stack, repo) → isi Markdown.

Semua gambar dalam isi Markdown dibungkus komponen `Figure` secara otomatis — override `img` di konfigurasi Markdown, jangan tulis manual per gambar.

Tabel Markdown perlu style: header mono uppercase kecil, garis 1px `--line`, tanpa zebra stripe. Di layar sempit, tabel bisa di-scroll horizontal.

Di bawah isi: tautan balik `← Semua karya`.

## Skema koleksi `karya`

```ts
{
  title: string
  slug: string
  client: string
  role: string
  team: string
  period: string
  status: string
  domain: string
  stack: string[]
  summary: string
  cover: string
  featured: boolean
  order: number
  confidential: boolean
  repo: string | null          // null = repositori privat
  metrics: { label: string, value: string }[]
}
```

Urutkan kartu berdasarkan `order` menaik.

**Catatan:** `content/id/ppdb-lhi.md` belum punya field `repo`. Tambahkan `repo: null`. Beberapa `metrics` bernilai `TODO` — render apa adanya.

## SEO

- `<title>`: `radlabs — [judul halaman]`
- Meta description dari `summary`
- og:image dari `cover`; landing pakai `/images/og.png` bila ada, kalau tidak ada lewati
- `sitemap` bawaan Astro boleh dipakai (`@astrojs/sitemap` diizinkan, ini satu-satunya pengecualian dependency)
- `site: 'https://radlabs.my.id'` di `astro.config.mjs`

## Deploy

Workflow `.github/workflows/deploy.yml`: checkout → setup Node 20 → `npm ci` → `npm run build` → `actions/upload-pages-artifact` dengan path `./dist` → `actions/deploy-pages`. Trigger `push` ke `main` + `workflow_dispatch`. Permissions: `contents: read`, `pages: write`, `id-token: write`.
