---
title: "Cerdas Amat"
slug: "cerdas-amat"
client: "Proyek pribadi"
role: "Pengembang tunggal (desain game, backend, frontend, 3D, DevOps)"
team: "Solo"
period: "Oktober 2026 – sekarang"
status: "Live, tersedia untuk umum"
problem: "Latihan perkalian 1–9 × 1–9 membosankan bila dikerjakan sendiri, sementara game adu cepat realtime biasanya butuh server yang terus menyala, akun pemain, dan biaya bulanan."
solution: "Membangun game tarik tali perkalian yang seluruh logikanya berjalan di satu Cloudflare Durable Object per room lewat WebSocket Hibernation, sehingga dua HP tetap sinkron dan tetap di plan gratis."
domain: "Permainan edukasi"
stack: ["Svelte 5", "TypeScript", "Three.js", "Cloudflare Workers", "Durable Objects", "WebSocket Hibernation", "Valibot", "PWA", "Playwright"]
summary: "Membangun game adu perkalian realtime untuk dua pemain di HP masing-masing, dengan server otoritatif di Cloudflare Durable Objects dan karakter voxel 3D, tanpa akun, tanpa database, dan tetap di plan gratis."
cover: "/images/cerdas-amat/01-arena.png"
featured: false
order: 5
confidential: false
repo: "https://github.com/cleveradit/cerdas-amat"
liveUrl: "https://cerdas-amat.radlabs.my.id"
liveLabel: "Main Cerdas Amat ↗"
metrics:
  - label: "Rata-rata fps, HP kelas bawah tersimulasi"
    value: "59,4 fps"
  - label: "Tes unit dan Durable Object"
    value: "90"
  - label: "Tes end-to-end"
    value: "17"
  - label: "JS awal (gzip)"
    value: "30,1 kB"
---

## Ringkasan

Cerdas Amat adalah game web untuk dua pemain yang bermain dari perangkat masing-masing. Keduanya beradu menjawab soal perkalian 1–9 × 1–9. Setiap jawaban benar menarik tali satu langkah ke arah penjawab, dan pemain yang unggul selisih 5 jawaban benar langsung menang KO. Pertandingan juga bisa selesai karena waktu habis (30, 60, 90, atau 120 detik, dipilih host), WO, atau menyerah.

![Arena di dua HP: Rubah dan Panda menarik tali, dengan skor dan posisi tali yang sama di kedua layar](/images/cerdas-amat/01-arena.png)

Pemain tidak perlu akun. Host membuat room, membagikan kode 5 karakter atau link lewat tombol Bagikan, lalu Player 2 bergabung. Ada lima karakter hewan bergaya voxel (kucing, beruang, rubah, panda, dan katak), masing-masing dengan lima pose yang dirender realtime. Aplikasi bisa dipasang di layar utama HP sebagai PWA.

![Layar pilih karakter, lobby dengan kode room, dan layar hasil setelah KO](/images/cerdas-amat/02-karakter-lobby-hasil.png)

## Server otoritatif di Durable Object

Setiap room adalah satu Durable Object yang dinamai langsung dari kodenya (`idFromName(code)`), sehingga tidak perlu tabel pencarian room. Hanya Durable Object yang boleh mengubah skor, posisi tali, fase, dan timer. Klien mengirim input lalu menggambar state yang diterima.

Alur satu jawaban:

1. Klien mencocokkan jawaban dengan soal lokal. Jawaban salah tidak dikirim ke server sama sekali.
2. Jawaban benar langsung memunculkan soal berikutnya di layar, lalu klien mengirim `answer { q, value }`.
3. Server memeriksa fase, nomor soal, dan nilainya. Bila lolos, skor naik dan pesan `tug` dikirim ke kedua pemain.
4. Kedua klien menggerakkan tali dari `score` di pesan `tug`, bukan dari hitungan sendiri, sehingga posisi tali di dua HP selalu sama.

Durable Object memproses pesan satu per satu. Dua jawaban yang tiba hampir bersamaan pada selisih 4 tetap punya urutan pasti: yang pertama menutup permainan, yang kedua ditolak karena fase sudah `result`.

Semua tenggat ditangani satu alarm per Durable Object: akhir hitung mundur, akhir waktu, batas jeda, cek heartbeat, batas kursi lobby, batas layar hasil, dan penghapusan room kosong. Alarm selalu dipasang ke tenggat terdekat, lalu handler-nya memproses semua tenggat yang sudah lewat.

## Koneksi HP yang tidak stabil

Game ini dirancang untuk HP di jaringan seluler, jadi putus koneksi diperlakukan sebagai kejadian normal:

| Kejadian | Perilaku |
| --- | --- |
| Terputus di lobby | Kursi ditahan 60 detik; token kursi 128-bit di localStorage mengklaim ulang kursi itu |
| Host pindah ke WhatsApp untuk membagikan kode | Klien langsung mencoba tersambung saat halaman terlihat lagi (`visibilitychange`) |
| Terputus saat bermain | Permainan dijeda 10 detik dan sisa waktu disimpan; maksimal 3 jeda per pemain |
| Tidak kembali dalam 10 detik | Lawan menang WO |
| Kedua pemain terputus | Pertandingan batal tanpa pemenang |
| Host keluar dari lobby | Player 2 menjadi host dengan kode room yang sama |

Klien mencoba tersambung ulang setelah 0,5, 1, dan 2 detik, lalu setiap 4 detik. Timer di kedua HP tetap sama walau jam perangkat berbeda, karena sisa waktu dihitung dari `endsAt` milik server ditambah selisih jam hasil pesan `sync`.

## Bertahan di plan gratis Cloudflare

Seluruh sistem berjalan di plan gratis Cloudflare. Bila kuota habis, tidak ada tagihan; operasi hanya gagal sampai reset pukul 07.00 WIB. Batas utamanya adalah durasi aktif Durable Object, bukan jumlah pesan, dan perkiraan kapasitasnya sekitar 600–700 pertandingan per hari. Penghematan yang diterapkan:

- **WebSocket Hibernation API:** room yang diam di lobby tidak dihitung durasinya.
- **Jawaban salah tidak dikirim** ke server karena tidak memengaruhi skor.
- **Ping dijawab `setWebSocketAutoResponse`** tanpa membangunkan Durable Object. Pemain tanpa ping selama 12 detik dianggap terputus.
- **Tulis storage maksimal 1 kali per detik** selama bermain. Identitas kursi tiap koneksi disimpan lewat `serializeAttachment` sehingga tidak memakai kuota tulis.
- **162 soal dikirim sekaligus** dalam dua deck berantai berisi 81 soal, dan deck baru ditambahkan sebelum soal habis, sehingga soal berikutnya tampil tanpa menunggu jaringan.

Bila kuota tetap habis, pemain melihat pesan "Server sedang penuh, coba lagi setelah pukul 07.00 WIB", bukan error teknis.

## Keamanan tanpa akun

- **Validasi pesan:** semua pesan didefinisikan sekali di paket `shared` beserta skema Valibot yang dipakai bersama oleh klien dan server. Pesan lebih dari 1 KB atau tidak valid ditolak, dan koneksi ditutup setelah 5 pesan tidak valid.
- **Cek fase dan kursi:** setiap aksi diperiksa fase dan kursi pengirimnya, misalnya hanya host yang bisa mengubah durasi atau memulai.
- **Rate limit per IP:** maksimal 20 room baru dan 30 kode salah per menit. Batasnya sengaja longgar karena satu sekolah atau satu jaringan seluler sering berbagi IP, sementara 28,6 juta kombinasi kode membuat tebakan tidak efektif.
- **Cek Origin** sebelum upgrade WebSocket.
- **Filter nama** Indonesia dan Inggris yang menormalisasi angka pengganti huruf (`4→a`, `0→o`, dan seterusnya).
- **Tanpa data permanen:** nama dan karakter hanya ada di storage room, dan room dihapus setelah kosong 5 menit.

## Karakter voxel di HP kelas bawah

Lima karakter dipindahkan dari preview HTML yang sudah disetujui ke data kode, satu file per hewan. Tiap bagian tubuh dirender sebagai satu `InstancedMesh` dengan titik putar di leher, bahu, dan pinggul, dan semua animasi dihitung dari kode.

Keputusan teknis untuk perangkat lemah:

- **Satu `WebGLRenderer` bersama** untuk layar pilih karakter, arena, dan hasil. Canvas-nya dipindah ke layar yang sedang tampil, karena browser HP membatasi jumlah konteks WebGL.
- **Three.js di-import dinamis** setelah menu tampil, jadi layar pertama tidak menunggu modul 3D. Bundle awal sekitar 30 kB JS (gzip).
- **`devicePixelRatio` dibatasi 2.** Tanpa WebGL, permainan tetap berjalan dengan tali 2D.
- **Kalibrasi warna ke preview:** preview memakai Three.js r128, sedangkan r155 menghapus mode lampu lama. Color management dimatikan dan intensitas lampu dikalikan π, sehingga kelima avatar tampil identik dengan preview, dengan selisih 0 per kanal warna.

Uji performa otomatis (`pnpm perf`) mensimulasikan HP kelas bawah: layar 360×740, DPR 2, dan CPU diperlambat 6×. Hasilnya rata-rata 59,4 fps, dengan detik terendah 54 fps, jauh di atas syarat lolos 30 fps.

## Pengujian berlapis

| Lapis | Alat | Cakupan |
| --- | --- | --- |
| Unit | Vitest | `makeDeck` (10.000 deck berantai: 81 soal unik per deck, tanpa pasangan tukar berurutan seperti 3 × 4 lalu 4 × 3, sambungan antardeck aman), aturan hasil KO/waktu/seri, filter nama, kode room |
| Durable Object | `@cloudflare/vitest-plugin` | Buat/join/penuh, pergantian host, jeda dan WO, batas 3 jeda, dua jawaban bersamaan, akhir waktu, rate limit |
| End-to-end | Playwright, 2 konteks browser | Pertandingan penuh sampai KO, waktu habis dan seri, putus koneksi lalu lanjut, WO, visual, keamanan, audio, PWA |

Totalnya ada 90 tes unit dan Durable Object (shared 28, client 13, worker 49) serta 17 tes end-to-end. Timer pada tes Durable Object dimajukan dengan memundurkan tenggat lewat `runInDurableObject`, lalu alarm dipicu manual, sehingga kode produksi tetap memakai `Date.now()` tanpa jam yang disuntikkan.

## Alur kerja dan rilis

Proyek ini dikerjakan dengan [Alur Kerja Terdokumentasi untuk AI Agent](/penelitian/workflow-template/) (P-02). Sebelum ada kode, GDD dan PRD teknis ditulis lebih dulu, termasuk tabel 22 keputusan produk yang final. Pembangunan dibagi menjadi 6 fase berurutan, masing-masing dengan satu syarat lolos. Server dan aturan main dikerjakan sebelum visual, supaya bagian tersulit teruji lebih dulu.

Setiap pekerjaan ditulis sebagai tiket implementasi yang disetujui sebelum dieksekusi. TICKET-001 sampai TICKET-004 mencakup fase 1 sampai 4, fase 5 dipecah menjadi TICKET-005 (keamanan dan tombol Bagikan) dan TICKET-006 (audio dan PWA), lalu TICKET-007 mengganti nama produk menjadi Cerdas Amat.

Satu Worker menyajikan aset klien, `POST /api/rooms`, dan `GET /ws/:code` di Custom Domain `cerdas-amat.radlabs.my.id`. Setiap pull request menjalankan lint, typecheck, unit test, tes Durable Object, build, dan tes end-to-end, lalu dideploy ke lingkungan preview dengan smoke test. Merge ke `main` mengulang langkah yang sama lalu dideploy ke produksi lewat GitHub Actions.

Fase berikutnya adalah uji di perangkat nyata (Android Chrome, iPhone Safari, dan pemasangan PWA) serta pemantauan kuota harian di minggu pertama rilis.
