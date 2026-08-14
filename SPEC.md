# SPEC.md — struktur situs

## Rute

| URL | Sumber |
|---|---|
| `/` | `src/pages/index.astro` + `content/id/site.md` |
| `/karya/[slug]` | digenerate dari koleksi `karya` |
| `/404` | halaman sederhana, tautan balik ke `/` |

Bahasa: Indonesia saja untuk sekarang. Folder `content/id/` sudah menyiapkan i18n nanti — **jangan bangun routing i18n sekarang.**

## Landing — hero + enam seksi, urut

Penempatan kontennya mengikuti https://zairussalam.id/.

0. **Hero** — tanpa nomor, tanpa judul seksi. Eyebrow mono → nama (`h1`) → peran (serif, aksen) → lede → dua tombol. Foto profil bundar di kanan pada ≥860px, di atas teks pada layar sempit. Latar memakai kisi milimeter.
1. **Tentang** — beberapa paragraf, latar `--sunken`.
2. **Pengalaman** — timeline dengan marker aksen. Tiap entri: peran (`h3`) → organisasi → periode + status → ringkasan → poin.
3. **Pendidikan** — kartu, grid dua kolom di ≥720px. Latar `--sunken`.
4. **Keahlian** — kartu per kelompok, tiap kelompok berisi pill. Grid 1 / 2 / 4 kolom di 0 / 560px / 900px.
5. **Karya** — kartu proyek. Latar `--sunken`.
6. **Kontak** — kartu tautan email, GitHub, LinkedIn. **Tanpa form.** Tanpa Calendly, tanpa janji waktu respons.

Latar seksi berselang-seling `--sunken` / `--bg`. Nomor seksi digenerate dari urutan seksi yang dirender, bukan ditulis di `content/` — kalau ada seksi ditambah atau dihapus, penomoran ikut menyesuaikan sendiri. Hero tidak ikut dihitung.

Header: wordmark + kepanjangan, tautan seksi, toggle tema. Tautan seksi **hanya dirender di landing** (`showNavLinks`); halaman lain memakai nav ringkas.

Footer: satu baris mono di tengah, tahun + nama.

## Anatomi kartu karya

Urut dari atas: baris notasi → judul (`h3`) + panah `↗` → ringkasan → cover (hanya varian solo) → tag stack sebagai pill → garis 1px → periode (kiri) dan status repo (kanan).

**Baris notasi**: nomor katalog `K-` + `order` dua digit di kiri, `status` dari frontmatter di kanan didahului titik 5px `--accent`. Di bawah 560px bertumpuk supaya status yang panjang terbaca utuh — memotongnya menyembunyikan teks di balik tooltip `title`, yang tidak bisa dibuka di perangkat sentuh.

**Angka `metrics` tidak dirender di kartu.** Tempatnya di halaman detail, di bawah lembar data. Kartu tetap ringkas seperti referensi.

Seluruh kartu adalah tautan ke `/karya/[slug]`. Hover: border berubah ke `--accent` dan panah ikut menguning. Tidak ada transform, tidak ada shadow.

**Status repo** dibaca dari field `repo`:
- berisi URL → label mono `↗ GitHub` sebagai tautan terpisah (`z-10` di atas tautan kartu yang meregang, jangan nested `<a>`)
- `null` → label mono `Repositori privat`, warna `--muted`, bukan tautan

**Layout adaptif:**
- 1 item → satu kartu selebar container, `cover` ditampilkan di dalam kartu
- 2+ item → grid 2 kolom, `cover` tidak ditampilkan
- Di bawah 720px → selalu satu kolom

Jangan render placeholder "coming soon" untuk slot kosong.

## Halaman detail

Urut: eyebrow `Karya` (tautan balik) → judul (`h1`) → `summary` sebagai lede → blok manifest bercaption `LEMBAR DATA` → baris `metrics` → isi Markdown → tautan balik `← Semua karya`.

Kepala halaman memakai kisi milimeter yang sama seperti hero landing.

Semua gambar dalam isi Markdown dibungkus `figure` berbingkai secara otomatis lewat `src/plugins/satteri-figure.mjs` — override di lapisan prosesor Markdown, jangan tulis manual per gambar. Tabel juga dibungkus `.table-scroll` di sana.

Tabel Markdown: header mono uppercase kecil, garis 1px `--line`, tanpa zebra stripe, bisa di-scroll horizontal di layar sempit.

## Model konten `content/id/site.md`

Semua teks yang tampil wajib berasal dari sini. Kunci tingkat atas:

```
meta      siteName, siteNameExpansion, url, description
nav       [{ label, href }]          ← urutannya = urutan seksi
hero      eyebrow, name, role, lede, photo, actions[{ label, href, variant }]
tentang   title, paragraphs[]
pengalaman title, items[{ role, org, period, status, summary, points[] }]
pendidikan title, items[{ title, org, period, note?, href? }]
keahlian  title, groups[{ title, items[] }]
karya     title, intro
kontak    title, intro, links[{ label, value, href }]
notFound  heading, body, backLabel
footer    text
```

Teks bertanda `[GANTI: ...]` adalah fakta yang belum tersedia. **Dirender apa adanya** — jangan dihapus, jangan ditebak, jangan "diperbaiki".

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

## SEO

- `<title>`: `radlabs — [judul halaman]`
- Meta description dari `summary`
- og:image dari `cover`; landing pakai `/images/og.png` bila ada, kalau tidak ada lewati
- `site: 'https://radlabs.my.id'` di `astro.config.mjs`

## Aset yang belum ada

Dirender hanya kalau filenya ada, tanpa placeholder:

- `public/images/profil.jpg` → foto hero
- `public/images/og.png` → og:image landing
- `public/favicon.png` → dirujuk `Base.astro`; selama belum ada, tiap halaman kena satu 404

## Deploy

Workflow `.github/workflows/deploy.yml`: checkout → setup Node → `npm ci` → `npm run build` → `actions/upload-pages-artifact` dengan path `./dist` → `actions/deploy-pages`. Trigger `push` ke `main` + `workflow_dispatch`. Permissions: `contents: read`, `pages: write`, `id-token: write`.
