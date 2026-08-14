# CLAUDE.md — radlabs.my.id

Situs portofolio statis. Baca `SPEC.md` (struktur) dan `DESIGN.md` (token visual) sebelum menulis kode.

## Stack — terkunci

- Astro + Tailwind CSS. Tidak ada framework JS lain.
- **Dilarang menambah dependency apa pun** tanpa bertanya lebih dulu. Tidak ada UI library, tidak ada animation library, tidak ada icon pack.
- Output statis ke `dist/`. Tidak ada SSR, tidak ada adapter.
- Deploy: GitHub Pages via GitHub Actions.
- Batas lebar (`max-width`) ditulis di CSS, bukan ditempel sebagai utility `max-w-*` di komponen — utility tidak bisa ditimpa dari `@layer components`, karena lapisan `utilities` selalu menang.

## Konten

- **Semua teks yang tampil di halaman wajib dibaca dari `content/`.** Dilarang menulis teks langsung di file `.astro`.
- **Dilarang mengarang konten.** Tidak boleh membuat angka, nama, testimoni, tanggal, atau deskripsi project yang tidak ada di `content/`. Termasuk dilarang mengisi lorem ipsum.
- Teks bertanda `[GANTI: ...]` adalah placeholder yang disengaja. Render apa adanya, jangan diganti, jangan dihapus, jangan "diperbaiki".
- Nilai `TODO` di frontmatter juga dirender apa adanya.
- Kalau ada data yang kurang untuk membangun sebuah komponen, **berhenti dan tanya**.

## Aset

- Sumber ada di `assets/`. Salin ke `public/images/` — jangan referensikan `assets/` langsung dari komponen.
- Path gambar di Markdown sudah memakai bentuk final `/images/...`. Jangan diubah.
- Tidak ada gambar? Jangan bikin SVG placeholder. Tanya.

## Wajib ada

- `public/CNAME` berisi satu baris: `radlabs.my.id`. **Jangan pernah dihapus** — file ini hilang berarti custom domain mati.
- Script anti-kedip tema inline di `<head>`, dieksekusi sebelum body dirender. Detail di `DESIGN.md`.
- Setiap halaman: `<title>`, meta description, dan og:image.

## Batas kualitas

- Responsif sampai 360px **dan** enak dilihat di landscape lebar (cek 1440px, bukan cuma layar sempit).
- **Dalam satu halaman, lebar teks dan lebar media harus sepadan.** Kalau gambar atau tabel dirender selebar container, kolom teks di halaman itu wajib ikut lebar container juga. Dilarang membiarkan paragraf terkunci di kolom sempit sementara gambar mencapai tepi kanan — sisanya terbaca sebagai lubang, bukan margin. Kalau memang mau kolom baca yang sempit, media di halaman itu harus ikut dipersempit.
- Setelah mengubah lebar container atau padding, **cek ulang semua halaman di layar lebar**. Melebarkan container tidak otomatis melebarkan isinya.
- Focus ring terlihat pada semua elemen interaktif.
- `prefers-reduced-motion` dihormati.
- Lighthouse ≥ 95 di keempat kategori.
- Tanpa JavaScript, halaman tetap terbaca penuh. JS hanya untuk toggle tema.

## Cara kerja

- Kerjakan satu tahap, lalu berhenti dan laporkan. Jangan lanjut ke tahap berikutnya tanpa diminta.
- Commit per tahap, pesan bahasa Inggris, format conventional commits.
- Jangan jalankan `git push` tanpa diminta.
