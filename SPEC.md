# SPEC.md — struktur situs

## Rute

Dua bahasa: Indonesia (default, tanpa prefiks) dan Inggris (`/en/`).

| URL | Sumber |
|---|---|
| `/` | `src/pages/index.astro` → `Landing.astro` + `content/id/site.md` |
| `/en/` | `src/pages/en/index.astro` → `Landing.astro` + `content/en/site.md` |
| `/penelitian/[slug]/` | koleksi `penelitian`, entri `content/id/*.md` |
| `/en/penelitian/[slug]/` | koleksi `penelitian`, entri `content/en/*.md` |
| `/404` | halaman sederhana (bahasa default), tautan balik ke `/` |

Helper bahasa ada di `src/i18n.ts`: `getSite(lang)`, `getPenelitian(lang)`, `localePath(lang, path)`, `otherLang(lang)`.

- Slug penelitian **sama** di kedua bahasa, jadi halaman padanan diturunkan dari path.
- Setiap halaman memasang `<html lang>`, `<link rel="alternate" hreflang>` untuk kedua bahasa, dan `og:locale`.
- Tombol bahasa adalah tautan ke halaman padanan (landing ↔ landing, detail ↔ detail yang sama). Di landing, `#seksi` yang sedang dibaca ditambahkan ke tautannya.
- Navigasi antarhalaman memakai View Transitions Astro (`<ClientRouter />`): tanpa memuat ulang dokumen. Tanpa JS, tautan berperilaku biasa. Aturan script-nya di `DESIGN.md`, "Bahasa".
- Menambah atau mengubah teks berarti mengubah **kedua** bahasa. Kunci `content/id/site.md` dan `content/en/site.md` wajib sama; frontmatter penelitian di kedua folder wajib punya field yang sama.

## Landing — hero + lima seksi, urut

0. **Hero** (`#hero`) — tanpa nomor, tanpa foto. Setinggi layar. Bar atas (status, lokasi | peran bergantian berukuran besar + penghitung), tengah (sambutan, nama `h1`, intro, lede stack | kartu catatan lab), bar bawah (dua tombol | petunjuk gulir). Latar kisi milimeter + kata raksasa `hero.backdrop` di tengah. Detail visual di `DESIGN.md`, "Hero landing".
1. **Tentang** — kepala: label, judul, deskripsi, kotak hipotesis kerja. Isi: kartu paragraf (paragraf pertama sebagai pembuka berwarna `--ink`), label pendidikan, kartu pendidikan (grid dua kolom di ≥640px). Latar `--sunken`.
2. **Pengalaman** — kepala selebar 5/12 berisi tab (satu per entri: peran ringkas, organisasi, periode ringkas); di layar sempit tab menjadi carousel dengan panah kiri-kanan. Isi: panel per entri — kode `EXP-NN`, peran (`h3`), organisasi, chip periode (aksen bila `current`), ringkasan, poin, tag di dasar kartu. Pola WAI-ARIA tabs dengan navigasi panah/Home/End. Kolom kiri tidak bergerak saat tab diganti (detail di `DESIGN.md`, "Pengalaman — tab"). **Tanpa JS** tab dan panah disembunyikan dan semua panel tampil berurutan.
3. **Keahlian** — kepala dengan kotak ringkasan (jumlah kategori dihitung dari data). Isi: grid kartu 1 / 2 kolom (0 / 640px), tiap kartu: judul, kode `LAB-NN`, pill; item di `highlight` diberi latar aksen. Latar `--sunken`.
4. **Penelitian** — kepala dengan kotak jumlah berkas + petunjuk (angka dan rentang katalog dihitung dari data). Isi: grid kartu 1 / 2 kolom.
5. **Kontak** — isi: kartu email (alamat, tombol salin, tombol kirim), kartu GitHub dan LinkedIn. Di bawahnya footer landing (teks footer + tautan kembali ke hero). Latar `--sunken`. **Tanpa form.** Tanpa Calendly, tanpa janji waktu respons.

Nomor seksi diberikan halaman dari urutan seksi yang dirender, bukan ditulis di `content/`. Hero tidak ikut dihitung.

Landing digulir bebas, tanpa scroll snap.

Header: wordmark + kepanjangan, tautan seksi (landing saja), tombol bahasa, toggle tema, tombol menu (landing, layar sempit, dengan JS). Halaman lain memakai nav ringkas tanpa tautan seksi. Rel indikator seksi hanya di landing.

Footer: di landing menyatu di seksi Kontak; halaman lain memakai satu baris mono di tengah.

## Anatomi kartu penelitian

Urut dari atas: baris notasi → judul (`h3`) + panah `↗` → ringkasan → tag stack sebagai pill → garis 1px → periode (kiri), status repo + ajakan "buka lembar lab" (kanan).

**Baris notasi**: chip nomor katalog `P-` + `order` dua digit di kiri, status di kanan didahului titik aksen. Status memakai `statusShort` bila ada, kalau tidak `status`. Status dibiarkan membungkus, tidak dipotong.

**Angka `metrics` tidak dirender di kartu.** Tempatnya di halaman detail. `cover` juga tidak ditampilkan di kartu.

Seluruh kartu adalah tautan ke halaman detail (tautan meregang di judul). **Dengan JS**, klik biasa membuka modal; klik dengan modifier (Ctrl/Cmd/Shift/Alt, tombol tengah) tetap mengikuti tautan. **Tanpa JS** kartu langsung membuka halaman detail.

**Status repo** dibaca dari field `repo`:
- berisi URL → `penelitian.repoLabel` sebagai tautan terpisah (`z-10` di atas tautan kartu yang meregang, jangan nested `<a>`)
- `null` → `penelitian.privateRepoLabel`, warna `--muted`, bukan tautan

Urutkan kartu berdasarkan `order` menaik. Jangan render placeholder "coming soon".

## Modal penelitian

Satu `<dialog>` per penelitian, dirender di server (`PenelitianDialog.astro`). Isi: label + nomor katalog, judul, `status`, kotak `problem`, kotak `solution`, tag stack, tombol ke halaman detail (tab yang sama), tombol tutup. Menutup: tombol tutup, Escape, atau klik di backdrop. Fokus kembali ke kartu asal.

## Halaman detail

Urut: eyebrow judul seksi Penelitian (tautan balik) → judul (`h1`) → `summary` sebagai lede → tombol situs live bila `liveUrl` tersedia → blok manifest bercaption lembar data → baris `metrics` → isi Markdown → tautan balik.

Kepala halaman memakai kisi milimeter yang sama seperti hero landing.

Semua gambar dalam isi Markdown dibungkus `figure` berbingkai secara otomatis lewat `src/plugins/satteri-figure.mjs` — override di lapisan prosesor Markdown, jangan tulis manual per gambar. Tabel juga dibungkus `.table-scroll` di sana.

Tabel Markdown: header mono uppercase kecil, garis 1px `--line`, tanpa zebra stripe, bisa di-scroll horizontal di layar sempit.

## Model konten `content/<lang>/site.md`

Semua teks yang tampil wajib berasal dari sini. Kunci tingkat atas:

```
meta        siteName, siteNameExpansion, url, description
ui          navLabel, railLabel, menuOpen, menuClose, themeToLight, themeToDark,
            langSwitch{ label, srLabel }
nav         [{ label, href }]          ← urutannya = urutan seksi
hero        railLabel, status, eyebrow, welcome, name, intro, lede, roles[],
            labNote{ label, live, notes[{ code, title, desc }],     ← berpasangan dengan roles
                     stationsLabel, stationsValue, archiveLabel, archiveValue },
            backdrop, actions[{ label, href, variant }], scrollHint
tentang     eyebrow, title, description, hypothesis{ label, text }, paragraphs[],
            pendidikan{ title, verifyLabel, items[{ title, org, period, note?, href? }] }
pengalaman  eyebrow, title, description, tabsLabel, prevLabel, nextLabel, logLabel, codePrefix,
            items[{ role, tabRole?, org, period, tabPeriod?, current?, summary, points[], tags[] }]
keahlian    eyebrow, title, description, summary{ label, value, text }, codePrefix,
            groups[{ title, items[], highlight?[] }]
penelitian  eyebrow, title, description, countLabel, hint, cardAction, repoLabel,
            privateRepoLabel, catalogPrefix, backLabel,
            dialog{ label, problemLabel, solutionLabel, openLabel, closeLabel, closeSrLabel },
            dataSheetLabel, manifest{ role, team, period, status, stack, repo }
kontak      eyebrow, title, description, copyLabel, copiedLabel, sendLabel,
            links[{ label, value, href, display? }], backToTop
notFound    heading, body, backLabel
footer      text
```

Penanda di dalam teks:
- `**teks**` → penekanan (`<strong>`), diubah oleh `inline()` di `src/i18n.ts` setelah teks di-escape.
- `{n}`, `{first}`, `{last}` → nilai yang dihitung dari data (jumlah seksi, jumlah kategori, jumlah dan rentang katalog penelitian). Jangan diganti angka manual.

Tautan `mailto:` di `kontak.links` dirender sebagai kartu email; sisanya kartu tautan dengan `display` di kakinya.

Teks bertanda `[GANTI: ...]` adalah fakta yang belum tersedia. **Dirender apa adanya** — jangan dihapus, jangan ditebak, jangan "diperbaiki".

## Skema koleksi `penelitian`

Sumber: `content/id/*.md` dan `content/en/*.md` (kecuali `site.md`). id entri = `<lang>/<nama-file>`.

```ts
{
  title: string
  slug: string
  client: string
  role: string
  team: string
  period: string
  status: string
  statusShort?: string         // versi ringkas untuk kartu
  domain: string
  stack: string[]
  summary: string
  problem: string              // modal, bagian 01
  solution: string             // modal, bagian 02
  cover?: string
  featured: boolean
  order: number
  confidential: boolean
  repo: string | null          // null = repositori privat
  liveUrl?: string             // situs live, bila tersedia
  liveLabel?: string           // label tombol situs live
  metrics: { label: string, value: string }[]
}
```

## SEO

- `<title>`: `radlabs — [judul halaman]`
- Meta description dari `summary`
- og:image dari `cover`; landing pakai `/images/og.png` bila ada, kalau tidak ada lewati
- `site: 'https://radlabs.my.id'` di `astro.config.mjs`

## Aset yang belum ada

Dirender hanya kalau filenya ada, tanpa placeholder:

- `public/images/og.png` → og:image landing

## Deploy

Workflow `.github/workflows/deploy.yml`: checkout → setup Node → `npm ci` → `npm run build` → `actions/upload-pages-artifact` dengan path `./dist` → `actions/deploy-pages`. Trigger `push` ke `main` + `workflow_dispatch`. Permissions: `contents: read`, `pages: write`, `id-token: write`.
