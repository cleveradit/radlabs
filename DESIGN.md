# DESIGN.md — token visual

Nilai di bawah sudah disetujui lewat spesimen. **Pakai persis. Jangan menambah warna, font, atau radius baru.**

Arah desain: *technical editorial* dengan kerangka **lembar laboratorium**. Serif untuk judul, sans untuk isi, mono untuk metadata. Netral hangat, satu aksen ochre. Lapang. Bukan dashboard, bukan showcase — halaman yang terbaca seperti tulisan yang dipikirkan.

Nama situs adalah kiasan: **radlabs = radityo laboratorium**. Kiasan itu diwujudkan lewat *struktur*, bukan motif — kisi milimeter, tanda ukur, penomoran, notasi katalog. Tidak ada ikon alat lab, tidak ada tabung reaksi, tidak ada latar bertema. Kalau sebuah elemen lab hanya menghias dan tidak menandai apa pun, elemen itu tidak dipakai.

## Warna

Definisikan sebagai CSS custom property di `:root[data-theme="..."]`, lalu petakan ke Tailwind lewat `theme.extend.colors` memakai `var(--...)`.

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
- Aksen hanya untuk: nilai metrics, status dot, nomor seksi, hover border, focus ring, tautan. **Tidak untuk tombol besar, tidak untuk gradien, tidak untuk background seksi.**
- **Tidak ada gradien sebagai isian warna** — tidak ada sapuan, tidak ada latar berwarna gradasi. `repeating-linear-gradient` boleh dipakai **hanya** untuk menggambar garis kisi (lihat "Kerangka lembar lab"), dan `mask-image: linear-gradient(...)` boleh dipakai **hanya** untuk memudarkan kisi itu. Keduanya menghasilkan garis rambut 1px, bukan bidang warna.

## Tipografi

Satu keluarga, tiga peran — IBM Plex, dari Google Fonts.

| Peran | Font | Pemakaian |
|---|---|---|
| Display | IBM Plex Serif 500 | h1, h2, h3 |
| Body | IBM Plex Sans 400/500 | paragraf, navigasi |
| Utility | IBM Plex Mono 400/500 | manifest, tag stack, label, eyebrow, caption, footer, **nilai metrics**, nomor katalog, nomor seksi |

Skala:

| Elemen | Ukuran | Detail |
|---|---|---|
| h1 | `clamp(2rem, 6vw, 2.9rem)` | line-height 1.12, tracking -0.018em |
| h2 | `1.65rem` | line-height 1.22, tracking -0.012em |
| h3 | `1.15rem` | line-height 1.35 |
| body | `16px` | line-height 1.65 |
| lede | `1.08rem` | warna `--muted` |
| mono utility | `11–13px` | tracking 0.05–0.14em, uppercase untuk label |
| nilai metrics | mono `13px` | warna `--accent`, tracking 0.02em |

Nilai metrics **tidak lagi memakai serif 1.15rem**. Angka bukan judul, dan nilai `TODO` yang masih terpasang di `content/` tidak boleh jadi teks terbesar di halaman. Aksennya tetap — bobotnya yang turun.

Lebar container **1420px**, padding samping 24px. Di layar 1920px ini menyisakan 250px per sisi.

Container itu bingkai luar, bukan lebar teks. Di dalamnya ada dua lebar:

- **Kolom teks — maksimal 62ch.** Berlaku untuk paragraf, lede, daftar, dan blok manifest. Baris pendek itu disengaja; jangan dilebarkan mengikuti container.
- **Elemen lebar — mengisi penuh container.** Kartu karya, bingkai tangkapan layar, dan tabel. Inilah yang membuat halaman tidak terlihat seperti pita tipis di layar lebar.

## Bentuk & jarak

- Radius: **3px** untuk kartu dan bingkai, **2px** untuk tag dan tombol kecil. Tidak ada radius besar.
- Border: selalu 1px `--line`. Tidak ada shadow di mana pun.
- Jarak antar-seksi: 56px, dipisah garis atas 1px `--line`.
- Hero: padding 64px atas, 56px bawah.

## Kerangka lembar lab

Empat perangkat, semuanya struktural. Tidak ada yang kelima tanpa keputusan desain baru.

**1 — Kisi milimeter.** Hanya di blok hero (landing dan halaman detail), tidak di seluruh halaman — kelapangan tetap yang utama. Kotak 32px, garis 1px `--grid`, digambar dengan dua `repeating-linear-gradient`. Dipudarkan ke bawah dengan `mask-image` supaya blok manifest duduk di latar bersih.

**2 — Tanda ukur pada garis seksi.** Garis pemisah 1px `--line` antar-seksi diberi tick 1px setinggi 6px di kedua ujung container, digambar dengan `::before`/`::after`. Tanpa elemen DOM tambahan. Berlaku juga di garis atas footer.

**3 — Nomor seksi.** Eyebrow jadi `01 / KARYA`: nomor dua digit warna `--accent`, garis miring dan nama seksi warna `--muted`, semuanya mono uppercase. Penomoran mengikuti urutan seksi yang benar-benar dirender, jadi tidak pernah ada nomor yang bolong.

**4 — Notasi katalog pada kartu karya.** Baris mono di atas judul kartu: nomor katalog `K-02` di kiri (diturunkan dari field `order` di frontmatter), status dari frontmatter di kanan, didahului titik 5px warna `--accent`. Nomor katalog adalah notasi struktural, bukan klaim — sama statusnya dengan penomoran seksi.

## Elemen signature — blok manifest

Daftar key/value bergaris tipis dalam mono. Muncul dua kali: di bawah hero landing, dan di atas halaman detail. Ini penanda identitas situs — jangan diganti gaya lain.

- Grid dua kolom: label 128px, nilai fleksibel. Di bawah 520px jadi satu kolom bertumpuk.
- Ikut lebar kolom teks (62ch), bukan lebar container. Dibiarkan melar, garis antar-barisnya memanjang jauh melewati isi dan blok ini kehilangan bentuknya.
- Label: mono 11px, uppercase, tracking 0.05em, warna `--muted`.
- Nilai: mono 12.5px, warna `--ink`.
- Garis 1px `--line` di atas, di bawah, dan antar-baris. Baris terakhir tanpa garis bawah.

## Bingkai tangkapan layar

Semua screenshot berlatar putih. Tanpa bingkai, gambar menyilaukan di tema gelap.

Setiap gambar dibungkus: latar `--sunken`, border 1px `--line`, radius 3px, padding 14px. Caption di bawahnya memakai mono 11.5px warna `--muted`.

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

Tombol toggle di kanan atas: teks mono uppercase yang menyebut tema **tujuan** ("Terang" saat sedang gelap), border 1px, hover berubah ke `--accent`, punya `aria-label`.

## Yang dilarang

Gradien sebagai isian warna · shadow · glassmorphism · animasi scroll-reveal · skill bar persentase · grid logo teknologi · font Inter · aksen biru atau ungu · emoji sebagai ikon · teks "passionate" atau sejenisnya.

Khusus untuk nuansa lab: ikon alat laboratorium · tabung reaksi · molekul · latar kisi di seluruh halaman · label bergaya stiker botol spesimen · font monospace kedua "biar terlihat teknis".
