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

1. **Hero** — h1 berisi nama, lede, lalu blok manifest. Tanpa eyebrow, tanpa nomor, tanpa foto, tanpa tombol besar, tanpa animasi ketik. Latar hero memakai kisi milimeter (`DESIGN.md`, "Kerangka lembar lab").
2. **Karya** — eyebrow `01 / KARYA`, lalu kartu.
3. **Metode** — eyebrow `02 / METODE`, 4 langkah bernomor `01–04`.
4. **Tentang** — eyebrow `03 / TENTANG`, foto profil kecil + 3–4 kalimat.
5. **Kontak** — eyebrow `04 / KONTAK`, tautan email, GitHub, LinkedIn dalam gaya manifest. **Tanpa form.** Tanpa Calendly, tanpa janji waktu respons.

Semua eyebrow bernomor. Nomornya mengikuti urutan seksi yang dirender, bukan angka yang ditulis tangan di `content/` — kalau ada seksi ditambah atau dihapus, penomoran ikut menyesuaikan sendiri. Hero tidak ikut dihitung karena tidak punya eyebrow. Penomoran `01–04` di dalam seksi Metode tetap ada dan tidak bentrok: yang satu menomori seksi, yang satu menomori langkah.

Teks eyebrow tetap dibaca dari `content/id/site.md` (`karya.eyebrow`, `caraKerja.eyebrow`, `tentang.eyebrow`, `kontak.eyebrow`). Hanya nomor dan pemisah `/` yang digenerate.

Header: wordmark kiri, toggle tema kanan. Tanpa menu navigasi — halamannya cuma satu. Wordmark `radlabs` diikuti kepanjangannya (`meta.siteNameExpansion`) dalam mono kecil warna `--muted`; kepanjangannya disembunyikan di bawah 480px.

Footer: satu baris mono, tahun + nama.

## Anatomi kartu karya

Urut dari atas: baris notasi → judul (h3) → satu kalimat `summary` → tag stack → garis 1px → baris bawah berisi semua `metrics` (kiri) dan status repo (kanan).

**Baris notasi** ada di paling atas kartu, mono 11px: nomor katalog `K-` + `order` dua digit di kiri, `status` dari frontmatter di kanan didahului titik 5px warna `--accent`. Status yang panjang dipotong di layar sempit, teks penuhnya tetap tersedia lewat atribut `title`. Nomor katalog digenerate dari `order` — ini notasi struktural, bukan data yang perlu ditulis di `content/`.

Nilai `metrics` dirender mono 13px warna `--accent`, bukan serif 1.15rem (`DESIGN.md`, tabel skala). Render **semua** `metrics` yang ada di frontmatter — jangan potong ke jumlah tetap. Di layar sempit, baris metrics membungkus ke baris kedua. Batas atas 4 metric supaya kartu tidak melar; kalau ada file konten yang butuh lebih, itu keputusan desain baru, bukan hal yang diam-diam dipotong.

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

Blok manifest di halaman ini diberi caption mono `LEMBAR DATA` di atasnya. Gaya blok manifestnya sendiri tidak berubah — ia elemen signature (`DESIGN.md`). Bagian atas halaman (judul + lede + manifest) memakai kisi milimeter yang sama seperti hero landing.

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
