# Prompt untuk Claude Code

Jalankan **satu tahap per sesi**. Setelah tiap tahap, jalankan `npm run dev` dan lihat hasilnya sebelum lanjut. Jangan gabung ketiganya.

---

## Tahap 1 — scaffold + token visual

```
Baca CLAUDE.md, SPEC.md, dan DESIGN.md sebelum mulai.

Tugas tahap ini saja:
1. Scaffold project Astro minimal (template empty) + Tailwind.
2. Terjemahkan DESIGN.md jadi CSS custom property dua tema dan konfigurasi
   Tailwind. Muat IBM Plex Serif/Sans/Mono dari Google Fonts.
3. Buat layouts/Base.astro: head lengkap, script anti-kedip tema inline
   sebelum stylesheet, header (wordmark kiri + ThemeToggle kanan), footer.
4. Buat components/ThemeToggle.astro sesuai DESIGN.md.
5. Buat public/CNAME berisi radlabs.my.id
6. Buat halaman /  sementara yang HANYA menampilkan spesimen token:
   contoh h1/h2/h3/body/mono, enam swatch warna dengan nilai hex-nya,
   dan satu contoh blok manifest. Ini halaman uji, akan dibuang di tahap 2.

Jangan buat komponen lain. Jangan sentuh content/. Berhenti setelah ini
dan laporkan apa yang dibuat.
```

Yang perlu kamu cek: toggle bekerja, tidak ada kedipan putih saat refresh di tema gelap, tiga font benar-benar termuat (bukan fallback), warna sama persis dengan spesimen.

---

## Tahap 2 — landing

```
Lanjut tahap 2. Baca ulang SPEC.md.

1. Definisikan content collection `karya` sesuai skema di SPEC.md,
   sumbernya content/id/*.md kecuali site.md.
2. Baca teks landing dari content/id/site.md. Semua teks di halaman
   wajib berasal dari file itu — termasuk yang bertanda [GANTI: ...],
   render apa adanya tanpa diubah.
3. Salin assets/ ke public/images/ sesuai struktur di SPEC.md.
4. Bangun components/Manifest.astro, Section.astro, KaryaCard.astro.
5. Ganti halaman / dengan lima seksi sesuai SPEC.md.
   KaryaCard wajib mengikuti aturan layout adaptif 1-item vs 2-item.

Belum ada foto profil di assets/ — kalau file tidak ada, lewati elemen
gambar di seksi Tentang, jangan bikin placeholder.

Berhenti setelah ini.
```

Yang perlu kamu cek: kartu satu-satunya tampil lebar dan tidak terlihat kosong, hover border berubah ochre, semua `[GANTI: ...]` muncul utuh, tampilan 360px rapi.

---

## Tahap 3 — halaman detail + deploy

```
Lanjut tahap 3.

1. Buat src/pages/karya/[slug].astro sesuai SPEC.md — judul, lede,
   blok manifest, lalu isi Markdown.
2. Buat components/Figure.astro dan pasang sebagai override komponen `img`
   untuk semua konten Markdown, jangan manual per gambar.
3. Beri style elemen Markdown: h2, h3, p, ul, tabel, blockquote, hr —
   semuanya memakai token DESIGN.md. Tabel scrollable di layar sempit.
4. Tautan balik "← Semua karya" di bawah isi.
5. Buat 404.astro sederhana.
6. Buat .github/workflows/deploy.yml sesuai SPEC.md.
7. Jalankan build, laporkan skor Lighthouse kalau bisa diukur.

Berhenti setelah ini. Jangan git push.
```

Yang perlu kamu cek: screenshot berlatar putih duduk tenang dalam bingkai di tema gelap, tabel keputusan teknis terbaca di ponsel, `dist/CNAME` ada setelah build.

---

## Setelah tiga tahap

1. Isi placeholder `[GANTI: ...]` di `content/id/site.md`
2. Isi tiga `TODO` di `content/id/ppdb-lhi.md`
3. Masukkan 7 screenshot ke `assets/ppdb/` + foto profil + favicon
4. Push ke repo `<username>.github.io`
5. Settings → Pages → Source: **GitHub Actions**
6. DNS: A record apex ke IP GitHub Pages, CNAME `www` ke `<username>.github.io`
7. Tunggu sertifikat, centang **Enforce HTTPS**

---

## Kalau Claude Code melenceng

Kalimat yang biasanya cukup:

- "Kamu menulis teks yang tidak ada di content/. Baca ulang CLAUDE.md bagian Konten."
- "Kamu menambah dependency tanpa bertanya. Hapus, pakai yang sudah ada."
- "Warna ini tidak ada di DESIGN.md. Pakai token yang sudah didefinisikan."
- "Ini tahap berikutnya, belum diminta. Kembalikan dan berhenti di tahap sekarang."
