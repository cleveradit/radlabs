# SPEC.md — struktur situs

## Rute

| URL | Sumber |
|---|---|
| `/` | `src/pages/index.astro` + `content/id/site.md` |
| `/penelitian/[slug]` | digenerate dari koleksi `penelitian` |
| `/404` | halaman sederhana, tautan balik ke `/` |

Bahasa: Indonesia saja untuk sekarang. Folder `content/id/` sudah menyiapkan i18n nanti — **jangan bangun routing i18n sekarang.**

## Landing — hero + lima seksi, urut

Penempatan kontennya mengikuti https://zairussalam.id/.

0. **Hero** — tanpa nomor, tanpa judul seksi, tanpa foto. Setinggi layar, isi di empat sudut: eyebrow mono (kiri atas) → peran berganti-ganti + penghitung (kanan atas) → nama `h1` + lede (kiri bawah) → dua tombol (kanan bawah). Latar memakai kisi milimeter dan kata raksasa `hero.backdrop`. Detail visual di `DESIGN.md`, "Hero landing".
1. **Tentang** — beberapa paragraf, lalu label `Pendidikan` dan kartu pendidikan (grid dua kolom di ≥720px). Latar `--sunken`. Setinggi layar seperti hero (`fullscreen`): judul di atas, isi di tengah secara vertikal di sisa ruang. Latar berisi beberapa erlenmeyer kecil bergaris samar (lihat `DESIGN.md`, "Erlenmeyer di latar Tentang").
2. **Pengalaman** — timeline dengan marker aksen. Tiap entri: peran (`h3`) → organisasi → periode + status → ringkasan → poin.
3. **Keahlian** — kartu per kelompok, tiap kelompok berisi pill. Grid 1 / 2 / 4 kolom di 0 / 560px / 900px. Latar `--sunken`.
4. **Penelitian** — kartu proyek.
5. **Kontak** — kartu tautan email, GitHub, LinkedIn. Latar `--sunken`. **Tanpa form.** Tanpa Calendly, tanpa janji waktu respons.

Latar seksi berselang-seling `--sunken` / `--bg`. Nomor seksi digenerate dari urutan seksi yang dirender, bukan ditulis di `content/` — kalau ada seksi ditambah atau dihapus, penomoran ikut menyesuaikan sendiri. Hero tidak ikut dihitung.

Header: wordmark + kepanjangan, tautan seksi, toggle tema. Tautan seksi **hanya dirender di landing** (`showNavLinks`); halaman lain memakai nav ringkas.

Footer: satu baris mono di tengah, tahun + nama.

## Anatomi kartu penelitian

Urut dari atas: baris notasi → judul (`h3`) + panah `↗` → ringkasan → cover (hanya varian solo) → tag stack sebagai pill → garis 1px → periode (kiri) dan status repo (kanan).

**Baris notasi**: nomor katalog `P-` + `order` dua digit di kiri, `status` dari frontmatter di kanan didahului titik 5px `--accent`. Di bawah 560px bertumpuk supaya status yang panjang terbaca utuh — memotongnya menyembunyikan teks di balik tooltip `title`, yang tidak bisa dibuka di perangkat sentuh.

**Angka `metrics` tidak dirender di kartu.** Tempatnya di halaman detail, di bawah lembar data. Kartu tetap ringkas seperti referensi.

Seluruh kartu adalah tautan ke `/penelitian/[slug]`. Hover: border berubah ke `--accent` dan panah ikut menguning. Tidak ada transform, tidak ada shadow.

**Status repo** dibaca dari field `repo`:
- berisi URL → label mono `↗ GitHub` sebagai tautan terpisah (`z-10` di atas tautan kartu yang meregang, jangan nested `<a>`)
- `null` → label mono `Repositori privat`, warna `--muted`, bukan tautan

**Layout adaptif:**
- 1 item → satu kartu selebar container, `cover` ditampilkan di dalam kartu
- 2+ item → slider horizontal, dua kartu terlihat di ≥720px, `cover` tidak ditampilkan
- Di bawah 720px → satu kartu dengan sedikit bagian kartu berikutnya tetap terlihat
- Slider bergerak kontinu dalam satu arah memakai `requestAnimationFrame` dan delta waktu. Salinan kartu dibuat oleh JavaScript di kiri dan kanan daftar asli agar sambungannya tidak terlihat
- Posisi dimulai pada salinan tengah dan dinormalisasi berdasarkan lebar lintasan yang diukur dari DOM. Ukuran dihitung ulang dengan `ResizeObserver`
- Pengguna dapat menahan lalu menggeser dengan mouse atau sentuhan. Drag menghentikan autoplay selama interaksi dan tidak boleh membuka tautan kartu
- Autoplay berhenti saat slider di-hover, fokus keyboard berada di dalamnya, slider di luar viewport, atau halaman tidak terlihat
- `prefers-reduced-motion: reduce` menonaktifkan autoplay sepenuhnya
- Salinan visual memakai `aria-hidden` dan `tabindex="-1"`; tautannya tetap bisa diklik dengan pointer, tetapi hanya tautan pada daftar asli yang masuk urutan fokus
- Tanpa JavaScript seluruh kartu tetap tersedia melalui overflow horizontal native
- Koleksi kosong atau tunggal tidak mengaktifkan infinite autoplay

Jangan render placeholder "coming soon" untuk slot kosong.

## Halaman detail

Urut: eyebrow `Penelitian` (tautan balik) → judul (`h1`) → `summary` sebagai lede → tombol situs live bila `liveUrl` tersedia → blok manifest bercaption `LEMBAR DATA` → baris `metrics` → isi Markdown → tautan balik `← Semua penelitian`.

Kepala halaman memakai kisi milimeter yang sama seperti hero landing.

Semua gambar dalam isi Markdown dibungkus `figure` berbingkai secara otomatis lewat `src/plugins/satteri-figure.mjs` — override di lapisan prosesor Markdown, jangan tulis manual per gambar. Tabel juga dibungkus `.table-scroll` di sana.

Tabel Markdown: header mono uppercase kecil, garis 1px `--line`, tanpa zebra stripe, bisa di-scroll horizontal di layar sempit.

## Model konten `content/id/site.md`

Semua teks yang tampil wajib berasal dari sini. Kunci tingkat atas:

```
meta      siteName, siteNameExpansion, url, description
nav       [{ label, href }]          ← urutannya = urutan seksi
hero      eyebrow, name, roles[], lede, backdrop, actions[{ label, href, variant }]
tentang   title, paragraphs[], pendidikan{ title, items[{ title, org, period, note?, href? }] }
pengalaman title, items[{ role, org, period, status, summary, points[] }]
keahlian  title, groups[{ title, items[] }]
penelitian title, intro, backLabel, catalogPrefix
kontak    title, intro, links[{ label, value, href }]
notFound  heading, body, backLabel
footer    text
```

Teks bertanda `[GANTI: ...]` adalah fakta yang belum tersedia. **Dirender apa adanya** — jangan dihapus, jangan ditebak, jangan "diperbaiki".

## Skema koleksi `penelitian`

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
  liveUrl?: string             // situs live, bila tersedia
  liveLabel?: string           // label tombol situs live
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

- `public/images/og.png` → og:image landing
- `public/favicon.ico` → dirujuk `Base.astro`; selama belum ada, tiap halaman kena satu 404

## Deploy

Workflow `.github/workflows/deploy.yml`: checkout → setup Node → `npm ci` → `npm run build` → `actions/upload-pages-artifact` dengan path `./dist` → `actions/deploy-pages`. Trigger `push` ke `main` + `workflow_dispatch`. Permissions: `contents: read`, `pages: write`, `id-token: write`.
