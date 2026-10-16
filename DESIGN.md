# DESIGN.md: token visual

Arah desain: **portofolio bertingkat seksi** dengan kerangka *laboratorium*. Nama situs dibaca lewat struktur (**radlabs = radityo laboratorium**), jadi setiap seksi diperlakukan sebagai satu "stasiun" lab: nomor seksi, label mono bergaya log (`01 // PROFIL PENELITI`), kartu catatan lab, nomor katalog, dan lembar data.

Landing terdiri dari hero + lima seksi. Di layar lebar tiap seksi minimal setinggi satu layar, dengan kepala seksi di kolom kiri dan isi di kolom kanan. Halaman digulir bebas, **tanpa scroll snap**.

## Warna

**Palet belum final.** Pemilik situs akan memilih warna setelah melihat hasilnya langsung. Sampai ada keputusan, token di bawah dipakai apa adanya. Saat warna diganti, ganti nilainya di sini dan di `global.css` saja; komponen tidak boleh menyimpan warna sendiri.

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

Token turunan, bukan warna baru, wajib diturunkan lewat `color-mix`, bukan ditulis sebagai hex:

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `--grid` | `color-mix(in srgb, var(--line) 55%, var(--bg))` | garis kisi milimeter |
| `--accent-soft` | `color-mix(in srgb, var(--accent) 12%, transparent)` | latar chip status, pill sorotan, tautan nav aktif |

Catatan:
- Aksen punya **dua nilai berbeda** per tema. Jangan pakai satu warna untuk kedua tema.
- Teks di atas latar aksen memakai `--bg`, bukan warna tetap.
- Aksen dipakai untuk: tombol primer, label seksi (`01 // …`), peran di hero, chip status, nomor katalog, periode tab aktif, nilai metrics, hover border, focus ring, dan tautan.
- Border aksen tipis memakai `color-mix(in srgb, var(--accent) 40%, transparent)`.
- **Tidak ada gradien sebagai isian warna.** `repeating-linear-gradient` hanya untuk garis kisi, `mask-image: linear-gradient(...)` hanya untuk memudarkan kisi itu.
- Latar seksi **berselang-seling** `--sunken` / `--bg`: Tentang, Keahlian, Kontak di `--sunken`.

## Tipografi

Dua keluarga dari Google Fonts, keduanya berlisensi SIL Open Font License 1.1 (bebas dipakai, termasuk komersial).

| Peran | Font | Pemakaian |
|---|---|---|
| Sans | Plus Jakarta Sans 400/500/600/700 | judul (700), paragraf, isi kartu |
| Mono | JetBrains Mono 400/500/600 | nav, eyebrow, label, pill, tombol, periode, nomor katalog, nilai metrics, footer |

Skala:

| Elemen | Ukuran | Detail |
|---|---|---|
| nama hero (`h1`) | `clamp(1.875rem, 4.6vw, 3.35rem)` | 700, line-height 1.12, tracking -0.02em |
| peran hero | `clamp(2.4rem, 7vw, 5.5rem)` | 700 uppercase, line-height 0.92, tracking -0.035em |
| h1 halaman detail | `clamp(2.1rem, 6vw, 3.1rem)` | line-height 1.1 |
| h2 (judul seksi) | `clamp(1.5rem, 4vw, 1.875rem)` | 700, line-height 1.2 |
| h3 | `1.15rem`; judul kartu `1rem` | line-height 1.35–1.4 |
| body | `16px`; isi kartu 14–15px | line-height 1.65 |
| deskripsi seksi | `14px` | warna `--muted` |
| mono utility | `10–13px` | tracking 0.04–0.16em, uppercase untuk label |

Lebar container **1280px**. Padding samping 24px, naik ke **40px di ≥1024px**. Jangan dipersempit: di laptop 1440px container yang lebih sempit menyisakan pita kosong besar di kiri-kanan.

**Container adalah satu-satunya pembatas lebar teks.** Tidak ada batas baca terpisah di paragraf, lede, manifest, atau daftar. Di landing, teks mengikuti lebar kolomnya (kolom kepala atau kolom isi), dan kartu serta grid di kolom yang sama selebar teksnya. Di halaman detail, tangkapan layar dan tabel dirender selebar container, jadi paragrafnya juga.

## Bentuk & jarak

- Radius: **12px** untuk kartu dan tab, **16px** untuk modal, **8px** untuk tombol dan kotak di dalam kartu, **999px** untuk pill dan tombol ikon.
- Border: 1px `--line`.
- Shadow **boleh**, tapi tipis dan jarang: kotak peran di hero (`0 1px 2px`) dan modal (`0 25px 50px -12px`). Kartu biasa tanpa shadow.
- Padding kartu: 20px, 24px di ≥640px.
- Seksi landing: padding 64px atas-bawah; di ≥1024px minimal `100svh` dikurangi `--nav-h`, isi ditengahkan vertikal, padding 48px.
- Hero: minimal `100svh` dikurangi `--nav-h`, padding 32px atas-bawah.
- Kepala halaman detail penelitian: padding 64px. Halaman 404: 80px.

## Tata letak seksi

`Section.astro` menyusun setiap seksi:

- **≥1024px:** grid 12 kolom. Kepala seksi 4 kolom (Pengalaman 5, karena tab ada di sana), isi 8 kolom (Pengalaman 7). Kepala `position: sticky` pada `calc(var(--nav-h) + 28px)`, kecuali seksi dengan `stickyTitle` (Pengalaman) yang hanya menempelkan blok judulnya.
- **<1024px:** satu kolom, kepala di atas isi, tidak menempel. Grid memakai `minmax(0, 1fr)` supaya isi yang tidak membungkus tidak melebarkan kolom.

## Pengalaman: tab

- **Tab** di kolom kepala, panel di kolom isi. Kolom kiri (judul + tab) tidak boleh bergerak saat tab diganti.
- **≥1024px:** isi seksi ditengahkan vertikal, jadi tinggi kolom kanan harus tetap. Semua panel ditumpuk di satu sel grid (tinggi sel = panel tertinggi), dan panel tidak aktif disembunyikan dengan `visibility`, bukan `display: none`, supaya tetap ikut mengukur. Tiap kartu tetap **setinggi isinya** (`align-self: start`); sisa ruang ada di bawah kartu, bukan di dalamnya. Yang menempel hanya **blok judul** (nomor, judul, deskripsi; `Section stickyTitle`), bukan daftar tab: di layar pendek judul menempel tepat di bawah nav selama kartu yang panjang digulir, sementara tab ikut tergulir dan lewat di bawah judul. Blok judul diberi latar sewarna seksi yang membentang sampai bawah nav, dengan margin negatif supaya jaraknya ke elemen sekitar tidak berubah.
- **<1024px:** panel memakai tinggi alaminya (tab ada di atas panel, jadi tidak ikut bergeser). Tab menjadi carousel satu tab penuh di antara dua tombol panah (`icon-btn`), bisa di-swipe dengan snap horizontal di dalam daftar tab. Panah mati di ujung daftar. Di bawah 640px periode turun ke bawah judul tab.
- Ganti pengalaman lewat klik tab, tombol panah, atau panah keyboard/Home/End. Pergantian panel memudar 0.25s.

## Hero landing

Tiga baris, tanpa foto:

- **Bar atas** (garis bawah 1px): chip status (titik berdenyut + `hero.status`) dan lokasi di kiri. Di kanan peran bergantian dalam huruf besar: kata pertama di baris pertama warna `--ink`, sisanya di baris kedua warna `--accent`, dengan penghitung mono `01 / 02` di bawahnya (angka aktif `--accent`). Di bawah 860px keduanya menumpuk rata kiri.
- **Tengah** (grid 12 kolom di ≥1024px, 8 + 4): sambutan mono aksen, nama `h1`, intro dengan penekanan, lede stack mono aksen. Di kanan kartu **catatan lab**: kode modul, judul, deskripsi, dan dua angka (jumlah seksi, rentang katalog penelitian) yang dihitung dari data.
- **Bar bawah** (garis atas 1px): dua tombol di kiri, petunjuk gulir `↓` di kanan.

**Kata raksasa** `hero.backdrop` **di tengah latar**: Plus Jakarta Sans 700, `25vw`, ditengahkan horizontal dan vertikal, warna `color-mix(in srgb, var(--line) 80%, var(--bg))`, `aria-hidden`. Lapisannya di atas kisi milimeter, di bawah isi. Hero memakai `overflow: clip`.

**Rotasi peran:** peran dan catatan lab berpasangan (indeks sama) dan berganti bersamaan. Semua dirender di server dan ditumpuk di satu sel grid; tanpa JS yang terlihat pasangan pertama. Pembaca layar membaca daftar peran lengkap lewat teks `sr-only`. JS mengganti tiap 4 detik: item lama keluar 0.3s, lalu item baru masuk 0.4s (peran naik sedikit dari bawah). Rotasi berhenti saat peran atau catatan ditunjuk kursor atau difokus, dan saat tab tidak terlihat, dan tidak berjalan sama sekali bila `prefers-reduced-motion: reduce`.

## Kerangka lab

- **Kisi milimeter.** Hanya di blok hero (landing, kepala halaman detail, 404). Kotak 32px, garis 1px `--grid`, dua `repeating-linear-gradient` pada `::before`, dipudarkan ke bawah dengan `mask-image`. **Wajib di pseudo-element**, karena `mask-image` memudarkan seluruh elemen termasuk teksnya.
- **Label seksi.** `NN // EYEBROW` di atas judul. Nomor digenerate dari urutan seksi, eyebrow dari `content/`.
- **Kode item.** `EXP-NN` di panel pengalaman, `LAB-NN` di kartu keahlian, `P-NN` di kartu penelitian. Semua digenerate dari urutan/`order`, prefiksnya dari `content/`.
- **Rel indikator** di tepi kanan (≥1024px): satu titik per seksi + hero, label muncul saat hover/fokus, titik aktif berwarna aksen.

## Erlenmeyer di latar seksi

Beberapa erlenmeyer kecil (24–46px) di latar hero dan seksi Tentang, Pengalaman, Keahlian, Penelitian, lewat `Flasks.astro`. Path SVG inline, bukan icon pack, bukan emoji, bukan file gambar.

- Garis saja: stroke 1.1, warna `color-mix(in srgb, var(--muted) 30%, var(--sunken))`.
- Posisi, ukuran, dan rotasi (±15°) ditulis sebagai data di `Landing.astro`, di pita kosong: tepi kiri-kanan di luar isi dan pita atas/bawah seksi.
- Di bawah 768px hanya yang tidak bertanda `wide` yang tampil.
- **Halaman detail penelitian** memakai komponen yang sama di seluruh artikel (`PenelitianDetail.astro`), dengan kerapatan yang sama seperti landing: satu erlenmeyer tiap ±460px, bergantian di pita kosong kiri dan kanan teks. Karena panjang artikel berbeda-beda, posisi y ditulis dalam px (`Flasks yUnit="px"`), bukan persen. Jumlahnya dihitung dari perkiraan tinggi halaman yang sengaja dilebihkan; yang melewati akhir halaman dipotong oleh `overflow: clip` pada `.detail-page`. Di bawah 768px hanya tiap baris ketiga yang tampil.
- `aria-hidden`, `pointer-events: none`, statis.

## Navigasi

Nav **`sticky`**, tinggi 56px + border 1px (`--nav-h: 57px`). Isi: titik aksen berdenyut + wordmark + kepanjangan (≥520px), tautan seksi, tombol bahasa, toggle tema, dan (layar sempit, dengan JS) tombol menu.

- **Dengan JS, <768px:** tautan seksi disembunyikan, diganti tombol hamburger yang membuka laci di bawah nav. Laci menutup saat tautan diklik atau Escape ditekan.
- **Tanpa JS, <768px:** tombol menu tidak tampil; tautan seksi jatuh ke baris kedua dan bisa digeser horizontal (`--nav-h` ≈ 88px).
- Tautan seksi yang sedang terlihat diberi `aria-current` (aksen + latar `--accent-soft`), lewat scroll spy berbasis garis tengah viewport.
- `scroll-padding-top: var(--nav-h)` supaya jangkar seksi berhenti tepat di bawah nav.

## Tombol & elemen kecil

- `.btn`: mono 12px 600 uppercase, tracking 0.08em, radius 8px. Varian: `btn-primary` (latar aksen), `btn-outline` (latar `--surface`), `btn-ghost` (latar `--sunken`), `btn-sm` (11px, tanpa uppercase).
- `.icon-btn`: bundar 36px, border 1px, hover ke aksen. Dipakai toggle tema, tombol bahasa, tombol menu, tombol tutup modal.
- `.pill`: mono 11.5px, latar `--sunken`, teks `--ink`, hover border aksen. `pill-accent` untuk alat utama di Keahlian.
- Chip: `catalog-chip` (nomor katalog), `period-chip` (periode pengalaman; aksen untuk posisi yang sedang berjalan), `status-chip` (status lab di hero).

## Modal penelitian

`<dialog>` native per penelitian: lebar maks 42rem, radius 16px, latar `--surface`, backdrop hitam 70% + blur 4px. Isi: `Berkas lab // P-NN`, judul, status, dua kotak (masalah, solusi), tag stack, tombol ke halaman detail, tombol tutup. Halaman di belakangnya tidak ikut tergulir selama modal terbuka.

## Blok manifest

Daftar key/value bergaris tipis dalam mono, di halaman detail penelitian dengan caption lembar data. Grid dua kolom: label 128px, nilai fleksibel; di bawah 520px satu kolom. Ikut lebar container.

## Bingkai tangkapan layar

Semua screenshot berlatar putih. Setiap gambar dibungkus: latar `--sunken`, border 1px `--line`, radius 12px, padding 14px. Caption di bawahnya mono 11.5px `--muted`.

## Blok kode

Blok kode di isi Markdown diwarnai Shiki dengan tema `css-variables` (`astro.config.mjs`), yang menulis warna sebagai `var(--astro-code-*)`. Variabel itu dipetakan ke token situs di `global.css`: latar `--sunken`, teks `--ink`, komentar dan tanda baca `--muted`, keyword/konstanta/tautan `--accent`. Jangan memakai tema Shiki biasa (mis. `github-dark`): warnanya ditulis sebagai hex di inline style dan tidak ikut tema terang/gelap.

Bingkai: border 1px `--line`, radius 8px, padding 14px 16px, mono 12.5px, bisa di-scroll horizontal.

## Tema

- Default kunjungan pertama: **gelap**. Kalau sistem pengunjung menyatakan `prefers-color-scheme: light`, ikuti itu.
- Pilihan manual disimpan di `localStorage` key `theme`, nilai `dark` / `light`.
- Tema diterapkan lewat atribut `data-theme` pada `<html>`.
- Transisi warna 0.25s ease pada `background-color` dan `color` saja.

**Script anti-kedip wajib inline di `<head>`, sebelum stylesheet.** Script yang sama memasang kelas `.js` pada `<html>`, dipakai CSS untuk menyembunyikan elemen yang hanya bermakna dengan JS (`.js-only`) tanpa lompatan tata letak, dan memasang ulang keduanya ke dokumen baru saat View Transitions menukar halaman:

```html
<script>
  (function () {
    function apply(doc) {
      var root = doc.documentElement;
      root.classList.add('js');
      try {
        var t = localStorage.getItem('theme');
        if (!t) t = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        root.dataset.theme = t;
      } catch (e) {}
    }
    apply(document);
    document.addEventListener('astro:before-swap', function (e) { apply(e.newDocument); });
  })();
</script>
```

Toggle tema: tombol bundar berisi simbol SVG inline yang menyebut tema **tujuan**: matahari saat gelap, bulan saat terang. Garis 1.4px `currentColor`. Nama aksesibel dari teks `sr-only` (dari `content/`). Simbol dipilih lewat CSS, bukan JS.

## Bahasa

Tombol bahasa di kiri toggle tema: tombol bundar berisi kode bahasa **tujuan** (`EN` di halaman Indonesia, `ID` di halaman Inggris), mono 11px 600. Tautan biasa ke halaman padanan, jadi berfungsi tanpa JS. Nama aksesibel dari `ui.langSwitch.srLabel`, ditandai atribut `lang` bahasa tujuan.

Pindah halaman (termasuk ganti bahasa) memakai **View Transitions** bawaan Astro (`<ClientRouter />` di `Base.astro`): halaman baru diambil di latar dan ditukar dengan transisi pudar, tanpa memuat ulang dokumen. Di landing, scroll spy menambahkan `#seksi` yang sedang dibaca ke tautan bahasa, jadi setelah ganti bahasa pengunjung tetap di seksi yang sama.

Konsekuensi untuk script:
- Script modul hanya berjalan sekali. Inisialisasi ditaruh di `document.addEventListener("astro:page-load", …)`, yang berjalan di muatan awal dan setelah setiap pindah halaman.
- Listener di `document`/`window`, interval, dan observer dilepas lewat `AbortController` yang di-abort pada `astro:before-swap`.
- Atribut `<html>` ikut ditukar; script anti-kedip memasang ulang `data-theme` dan `.js` ke dokumen baru pada `astro:before-swap`.

## Gerak

- Animasi yang ada: denyut titik wordmark (`ping`), denyut titik status (`pulse`), pudar silang rotasi peran dan panel pengalaman, transisi warna hover, transisi pudar antarhalaman (View Transitions). Semuanya mati di bawah `prefers-reduced-motion: reduce`, lewat aturan global, atau otomatis oleh Astro untuk View Transitions.
- `scroll-behavior: smooth`, kembali ke `auto` di bawah reduced motion.

## Yang dilarang

Gradien sebagai isian warna · animasi scroll-reveal · skill bar persentase · grid logo teknologi · emoji sebagai ikon · icon pack · teks "passionate" atau sejenisnya.

Khusus nuansa lab: ikon alat laboratorium selain erlenmeyer di latar seksi · tabung reaksi · molekul · latar kisi di seluruh halaman · label bergaya stiker botol spesimen.
