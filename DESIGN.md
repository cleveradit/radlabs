# DESIGN.md — token visual

Arah desain: **portofolio bertingkat seksi** dengan kerangka *lembar laboratorium*. Struktur penempatan kontennya mengikuti https://zairussalam.id/ — nav menempel, timeline pengalaman, kartu pendidikan/keahlian/proyek, kontak berbentuk kartu. Hero landing mengikuti komposisi https://muhamad-rusdiana.vercel.app/ — setinggi layar, isi di empat sudut, tipografi raksasa — tapi tetap memakai palet, font, dan larangan di dokumen ini.

Yang membedakannya dari referensi: paletnya netral hangat dengan satu aksen ochre (bukan biru), tipografinya IBM Plex Serif/Sans/Mono (bukan Inter), dan nama situs dibaca lewat struktur — **radlabs = radityo laboratorium**.

Kiasan lab diwujudkan terutama lewat *struktur*: kisi milimeter, penomoran seksi, notasi katalog, lembar data. Satu-satunya motif alat lab yang diizinkan adalah erlenmeyer kecil di latar seksi Tentang (lihat di bawah); di luar itu tidak ada ikon alat lab dan tidak ada tabung reaksi.

## Warna

Definisikan sebagai CSS custom property di `:root[data-theme="..."]`, lalu petakan ke Tailwind lewat `@theme` memakai `var(--...)`.

| Token | Gelap (default) | Terang |
|---|---|---|
| `--bg` | `#161514` | `#FAF9F7` |
| `--surface` | `#1E1D1B` | `#FFFFFF` |
| `--sunken` | `#121110` | `#F1EEE9` |
| `--line` | `#2E2C29` | `#E3DFD8` |
| `--ink` | `#EDEAE4` | `#1A1917` |
| `--muted` | `#A19C93` | `#6B665E` |
| `--accent` | `#E0913C` | `#B45309` |

Satu token turunan, bukan warna baru:

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `--grid` | `color-mix(in srgb, var(--line) 55%, var(--bg))` | garis kisi milimeter |

`--grid` wajib diturunkan dari `--line`, bukan ditulis sebagai hex. Kalau kisinya terasa ramai di salah satu tema, **turunkan persentasenya** — jangan ganti warnanya.

Catatan penting:
- Aksen punya **dua nilai berbeda**. Jangan pakai satu warna untuk kedua tema.
- Netral gelap itu hangat (`#161514`), bukan slate/zinc bawaan Tailwind yang kebiruan.
- Aksen dipakai untuk: tombol primer, garis bawah judul seksi, nomor seksi, peran di hero, marker timeline, status dot, nilai metrics, hover border, focus ring, dan tautan.
- **Tidak ada gradien sebagai isian warna.** `repeating-linear-gradient` boleh dipakai hanya untuk menggambar garis kisi, dan `mask-image: linear-gradient(...)` hanya untuk memudarkan kisi itu. Keduanya menghasilkan garis rambut 1px, bukan bidang warna.
- Latar seksi **berselang-seling** `--bg` / `--sunken`. Ini yang memisahkan seksi, bukan garis.

## Tipografi

Satu keluarga, tiga peran — IBM Plex, dari Google Fonts.

| Peran | Font | Pemakaian |
|---|---|---|
| Display | IBM Plex Serif 500/600 | h1, h2, h3, h4 |
| Hero | IBM Plex Sans 700 | nama dan peran di hero landing saja |
| Body | IBM Plex Sans 400/500 | paragraf, tombol, poin timeline |
| Utility | IBM Plex Mono 400/500 | nav, eyebrow, label, pill, periode, nomor katalog, nilai metrics, footer |

Skala:

| Elemen | Ukuran | Detail |
|---|---|---|
| h1 | `clamp(2.1rem, 6vw, 3.1rem)` | line-height 1.1, tracking -0.02em |
| h1 hero landing | `clamp(2.4rem, 7.2vw, 6.5rem)` | Plex Sans 700, line-height 0.95, tracking -0.04em |
| peran hero | `clamp(2.4rem, 7vw, 5.5rem)` | Plex Sans 700 uppercase, line-height 0.92, tracking -0.035em |
| h2 (judul seksi) | `clamp(2.2rem, 5vw, 3.25rem)` | line-height 1.1, tracking -0.02em; h2 lain (isi Markdown) tetap `clamp(1.6rem, 4vw, 1.95rem)` |
| h3 | `1.2rem` | line-height 1.35 |
| h4 | `1rem` | line-height 1.4 |
| body | `16px` | line-height 1.65, lebar ikut container |
| lede | `1.08rem` | warna `--muted`, lebar ikut container |
| mono utility | `10–13px` | tracking 0.03–0.14em, uppercase untuk label |

Lebar container **1280px**. Padding samping 24px, naik ke **40px di ≥1024px** — tanpa itu, laptop 1440px menyisakan margin 10px per sisi dan halaman terbaca sesak, bukan lapang.

Referensi memakai 960px, tapi di layar 1920px itu menyisakan 480px kosong per sisi. 1280px memangkasnya jadi 320px tanpa membuat kartu jadi gua.

**Container adalah satu-satunya pembatas lebar teks.** Tidak ada batas baca terpisah di paragraf, lede, manifest, atau daftar. Alasannya: semua media di situs ini — tangkapan layar studi kasus, tabel, grid kartu pendidikan/keahlian/penelitian — dirender selebar container. Kolom teks yang lebih sempit dari itu akan menumpuk di kiri sementara gambar mencapai tepi kanan, dan di layar landscape sisanya terbaca sebagai lubang, bukan margin. Kalau suatu saat kolom baca yang sempit memang diinginkan, medianya harus ikut dipersempit di halaman yang sama.

## Bentuk & jarak

- Radius: **8px** untuk kartu, bingkai, dan tombol. **999px** untuk pill.
- Border: selalu 1px `--line`. Tidak ada shadow di mana pun.
- Padding kartu: 28px.
- Jarak antar-seksi: 80px atas dan bawah.
- Seksi setinggi layar (`fullscreen` di `Section.astro`): minimal `100svh` dikurangi `--nav-h`. Judul tetap di atas; isinya ditengahkan secara vertikal di sisa ruang. Isi yang lebih tinggi dari layar tetap memanjang. Hanya ukurannya yang mengikuti hero — gaya visual seksi tetap seperti seksi lain.
- Hero landing: tinggi minimum `100svh` dikurangi `--nav-h`, padding 40px atas, 56px bawah. Kepala halaman detail dan 404 tetap padding 72px atas, 80px bawah.

## Hero landing

Empat sudut, tanpa foto:

- **Kiri atas:** eyebrow mono (lokasi).
- **Kanan atas:** peran yang berganti-ganti. Kata pertama tiap peran di baris pertama warna `--ink`, sisanya di baris kedua warna `--accent`. Di bawahnya penghitung mono (`01 / 02`), angka aktif berwarna `--accent`.
- **Kiri bawah:** nama (`h1`) lalu lede mono (stack).
- **Kanan bawah:** dua tombol.

Di bawah 860px keempatnya menumpuk satu kolom rata kiri, urut seperti di atas.

**Kata raksasa** dari `hero.backdrop` di tengah latar: Plex Sans 700, `25vw`, warna `color-mix(in srgb, var(--line) 80%, var(--bg))`, `aria-hidden`. Lapisannya di atas kisi milimeter, di bawah teks. Hero memakai `overflow: clip` supaya kata ini tidak memicu scroll horizontal.

**Rotasi peran:** semua peran dirender di server dan ditumpuk di satu sel grid; tanpa JS yang terlihat peran pertama, dan pembaca layar membaca daftar lengkap lewat teks `sr-only`. JS mengganti peran tiap 3 detik: peran lama memudar 0.3s, lalu peran baru masuk 0.4s — keduanya tidak pernah bertumpuk. Rotasi berhenti saat ditunjuk kursor dan saat tab tidak terlihat, dan tidak berjalan sama sekali bila `prefers-reduced-motion: reduce`.

## Kerangka lembar lab

Empat perangkat, semuanya struktural.

**1 — Kisi milimeter.** Hanya di blok hero (landing, kepala halaman detail, dan 404), tidak di seluruh halaman. Kotak 32px, garis 1px `--grid`, digambar dengan dua `repeating-linear-gradient` pada `::before`. **Wajib di pseudo-element, bukan di elemennya sendiri** — `mask-image` memudarkan seluruh elemen termasuk teks di dalamnya.

**2 — Nomor seksi.** Mono kecil warna `--accent` tepat di atas judul seksi: `01`, `02`, … Penomoran mengikuti urutan seksi yang benar-benar dirender, jadi tidak pernah ada nomor yang bolong. **Hanya nomornya** — judulnya sudah ada di `h2` di bawahnya, menulis ulang membuat pembaca layar mengumumkannya dua kali.

**3 — Garis aksen judul seksi.** Batang 48×3px `--accent` di bawah tiap judul seksi, radius 2px.

**4 — Notasi katalog pada kartu penelitian.** Baris mono di atas judul kartu: nomor katalog `P-02` di kiri (diturunkan dari field `order` di frontmatter), status dari frontmatter di kanan, didahului titik 5px warna `--accent`.

## Erlenmeyer di latar Tentang

Beberapa erlenmeyer kecil (24–46px) tersebar di latar seksi Tentang, di slot `backdrop` milik `Section.astro`. Digambar sebagai satu `<symbol>` SVG inline yang dipakai ulang lewat `<use>` — bukan icon pack, bukan emoji, bukan file gambar.

- Garis saja, tanpa isian: stroke 1.1, warna `color-mix(in srgb, var(--muted) 30%, var(--sunken))`. Samar di kedua tema, tidak bersaing dengan teks.
- Posisi, ukuran, dan rotasi (±15°) ditulis sebagai data di `index.astro`. Sebagian besar di pita kosong atas dan bawah seksi, karena isinya berada di tengah secara vertikal.
- Di bawah 768px hanya tiga di sudut yang tampil (yang tidak bertanda `wide`).
- `aria-hidden`, `pointer-events: none`, statis — tanpa animasi.

## Navigasi

Nav **`sticky`, bukan `fixed`.** Nav ini setinggi dua baris di layar sempit dan satu baris di layar lebar; kalau `fixed`, body butuh padding atas yang harus ditebak per breakpoint. Sticky tetap ikut alur dokumen.

Tanpa tombol hamburger. Di bawah 768px, daftar tautan jatuh ke baris kedua dan bisa digeser horizontal — **tidak ada navigasi yang bergantung pada JavaScript.**

`scroll-padding-top` wajib diset supaya jangkar seksi berhenti tepat di bawah nav, memakai token `--nav-h`: 88px di layar sempit (nav dua baris), 54px di 768px ke atas. Tepat, tanpa jarak tambahan — seksi setinggi layar harus mengisi viewport tanpa menyisakan potongan seksi sebelumnya. Seksi biasa sudah punya padding atas 80px sebagai jarak napas.

## Blok manifest

Daftar key/value bergaris tipis dalam mono, dipakai di halaman detail penelitian dengan caption `LEMBAR DATA`. Grid dua kolom: label 128px, nilai fleksibel; di bawah 520px jadi satu kolom bertumpuk. Ikut lebar container.

## Bingkai tangkapan layar

Semua screenshot berlatar putih. Tanpa bingkai, gambar menyilaukan di tema gelap. Setiap gambar dibungkus: latar `--sunken`, border 1px `--line`, radius 8px, padding 14px. Caption di bawahnya mono 11.5px warna `--muted`.

## Tema

- Default kunjungan pertama: **gelap**. Kalau sistem pengunjung menyatakan `prefers-color-scheme: light`, ikuti itu.
- Pilihan manual disimpan di `localStorage` key `theme`, nilai `dark` / `light`.
- Tema diterapkan lewat atribut `data-theme` pada `<html>`.
- Transisi warna 0.25s ease pada `background-color` dan `color` saja.

**Script anti-kedip — wajib inline di `<head>`, sebelum stylesheet:**

```html
<script>
  (function () {
    try {
      var t = localStorage.getItem('theme');
      if (!t) t = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      document.documentElement.dataset.theme = t;
    } catch (e) {}
  })();
</script>
```

Tombol toggle di kanan atas: tombol bundar 28px berisi simbol SVG inline yang menyebut tema **tujuan** — matahari saat sedang gelap, bulan saat sedang terang. Garis 1.4px `currentColor`, border 1px, hover berubah ke `--accent`. Simbol digambar langsung di komponen, bukan dari icon pack atau emoji. Nama aksesibelnya teks `sr-only` ("Ganti ke tema terang"). Simbol dipilih lewat CSS, bukan JS, supaya tidak ada kedipan dan tetap benar saat JS mati.

## Yang dilarang

Gradien sebagai isian warna · shadow · animasi scroll-reveal · skill bar persentase · grid logo teknologi · font Inter · aksen biru atau ungu · emoji sebagai ikon · teks "passionate" atau sejenisnya.

Khusus untuk nuansa lab: ikon alat laboratorium selain erlenmeyer di latar Tentang · tabung reaksi · molekul · latar kisi di seluruh halaman · label bergaya stiker botol spesimen · font monospace kedua "biar terlihat teknis".
