---
title: "Sistem Penerimaan Peserta Didik Baru (PPDB)"
slug: "ppdb-lhi"
client: "Sekolah Islam Terpadu LHI"
role: "Pengembang aplikasi — melanjutkan aplikasi yang sudah berjalan"
team: "Tim IT SIT LHI (2 orang)"
period: "Februari 2026 – Agustus 2026"
status: "Live — dipakai seluruh unit sekolah yayasan"
domain: "Teknologi pendidikan"
stack:
  ["Laravel", "Filament", "Livewire", "Tailwind CSS", "Redis", "Docker", "WhatsApp Cloud API"]
summary: "Membangun lapisan pengelolaan tahun ajaran dan kuota, kanal notifikasi resmi ke wali, serta batas data antar-unit untuk sistem pendaftaran lima unit sekolah."
cover: "/images/ppdb/01-landing.png"
featured: true
order: 2
confidential: true
repo: null            # null = repositori privat
metrics:
  - label: "Unit sekolah dilayani"
    value: "5 unit / 4 jenjang"
  - label: "Pengujian otomatis"
    value: "501"
  - label: "Momen notifikasi otomatis"
    value: "7"
  - label: "Iterasi desain wizard"
    value: "3"
---

## Ringkasan

Sekolah Islam Terpadu LHI adalah yayasan pendidikan dengan lima unit sekolah di empat jenjang (PAUD, SD, SMP, SMA). Yayasan sudah punya website pendaftaran lama, tetapi keterbatasannya menyulitkan admin — dan yang paling terasa: **admin tidak bisa melacak tahun masuk yang dipesan calon siswa.** Sistem lama hanya mencatat kapan seseorang mendaftar, bukan untuk tahun ajaran mana ia memesan kursi (inden).

Saya bergabung melanjutkan pengembangan aplikasi penggantinya. Di atas fondasi yang sudah ada, saya membangun lapisan pengelolaan yang sebelumnya tidak tersedia:

- **Pengelolaan tahun ajaran dan kuota pendaftaran** per sekolah, program, dan jalur — termasuk satu alur terpandu untuk membuka tahun ajaran baru.
- **Kanal notifikasi resmi ke wali** lewat email dan WhatsApp Business, lengkap dengan riwayat pengiriman dan status baca.
- **Hak akses berjenjang dan isolasi data antar-unit**, sehingga tiap unit sekolah hanya melihat dan mengubah datanya sendiri.

Aplikasinya kini melayani PPDB seluruh unit yayasan.

![Halaman pendaftaran online — sisi orang tua/wali](/images/ppdb/01-landing.png)

![Formulir pendaftaran bertahap, dapat diakses dari ponsel](/images/ppdb/02-form-pendaftaran.png)

## Konteks & masalah

Tiap unit punya karakteristik berbeda — jenjang SMP dan SMA misalnya memiliki program (seperti Boarding) dan jalur pendaftaran (Reguler, Inden, Beasiswa, Pindahan) sendiri-sendiri. Satu aplikasi melayani semua unit ini, dengan data tiap sekolah terpisah satu sama lain.

**Masalah pada aplikasi lama** — alasan aplikasi ini dibangun:

- **Tahun inden tidak terlacak.** Admin hanya melihat kapan seseorang mendaftar, bukan untuk tahun ajaran mana kursi itu dipesan. Perencanaan kuota dan komunikasi ke orang tua jadi sulit.

**Yang belum tergarap saat saya bergabung** — pekerjaan yang kemudian saya ambil:

- **Tidak ada mesin kuota.** Jumlah yang diterima tidak dibatasi apa pun, dan membuka tahun ajaran berikutnya menuntut admin mengatur banyak hal manual di beberapa menu terpisah.
- **Tidak ada kanal notifikasi.** Setiap perubahan status — pembayaran diverifikasi, jadwal wawancara, hasil seleksi — harus disampaikan admin satu per satu, tanpa catatan apakah pesannya benar-benar sampai.
- **Batas antar-unit belum tegas.** Satu panel admin dipakai bersama seluruh unit, sementara data yang boleh dilihat tiap unit seharusnya berbeda.

## Peran saya

Saya tidak membangun aplikasi ini dari nol. Saat saya bergabung pada Februari 2026, fondasi awal sudah dikerjakan oleh rekan setim. Saya melanjutkan dan mengembangkannya secara signifikan.

| Sudah ada saat saya bergabung | Yang saya bangun & kembangkan |
|---|---|
| Form pendaftaran online dasar | Mesin kuota & kursi (terima/mundur) + alur terpandu pembukaan tahun ajaran |
| Halaman publik (pendaftaran, info pembayaran, bukti daftar) | Integrasi WhatsApp Business resmi (Meta Cloud API) end-to-end |
| Pemisahan data antar-sekolah di level model | Hak akses berjenjang & pengerasan isolasi antar-unit di panel admin |
| Proses rilis otomatis (CI/CD) dasar | Notifikasi email di latar belakang + riwayat pengiriman |
| | Perombakan mesin formulir, alur wawancara, dan berbagai perbaikan alur |

Singkatnya: fondasi dan alur pendaftaran dasar sudah ada; **saya membangun lapisan pengelolaan untuk admin, kanal komunikasi ke wali, dan pengamanan batas antar-unit.**

Beberapa fitur pada aplikasi ini dikerjakan rekan setim dan bukan kontribusi saya — antara lain analitik pengunjung, mode pemeliharaan, serta tautan resmi di landing page. Fitur-fitur itu tidak dibahas di studi kasus ini.

![Dasbor admin — ringkasan tahun ajaran aktif](/images/ppdb/03-dashboard-admin.png)

![Pengelolaan data pendaftar untuk admin](/images/ppdb/04-daftar-pendaftaran.png)

## Alur pembukaan tahun ajaran

Setelah fitur tahun ajaran dan kuota ditambahkan, muncul tantangan baru: membukanya untuk tahun berikutnya menuntut admin mengatur kuota, tahun ajaran, dan peleburan sisa kursi inden satu per satu di beberapa menu terpisah. Admin merasa kewalahan.

Solusi yang saya rancang: satu alur terpandu tiga langkah.

1. Admin memilih tahun ajaran yang akan diaktifkan.
2. Admin cukup mengisi kuota untuk tahun terbaru yang belum diatur — sisanya dihitung sistem secara otomatis.
3. Sistem menyelesaikan semuanya sekaligus dalam satu transaksi: menyiapkan tahun ajaran berikutnya, membuat kuota baru, melebur sisa kursi inden ke jalur reguler, mengaktifkan tahun ajaran, dan menyamakan tenggat pendaftaran seluruh unit.

Satu kali jalan, alur ini menyentuh **tiga tahun ajaran sekaligus**: tahun yang diaktifkan (sisa indennya dilebur), tahun berikutnya (ditampilkan sebagai ringkasan, sudah diatur di transisi sebelumnya), dan tahun ketiga (yang kuotanya diisi admin sekarang).

Yang membuat ini berhasil bukan sekadar fiturnya, tapi kesederhanaannya. Butuh tiga kali percobaan desain sampai alurnya benar-benar terasa ringkas — versi-versi awal masih meminta admin mengisi data yang sebenarnya sudah ada di sistem.

![Langkah 1 — pilih tahun ajaran yang akan diaktifkan; sistem menandai tahun yang akan dibuat otomatis](/images/ppdb/05-wizard-langkah-1.png)

![Langkah 2 — admin cukup mengisi total kuota; porsi Inden (30%) dan Reguler (70%) dihitung otomatis per sekolah](/images/ppdb/06-wizard-langkah-2.png)

![Langkah 3 — ringkasan lengkap (pergantian tahun, kuota baru, peleburan sisa inden) sebelum dieksekusi](/images/ppdb/07-wizard-langkah-3.png)

## Notifikasi resmi lewat WhatsApp Business

Email saja tidak cukup: di lingkungan sekolah, orang tua jauh lebih responsif di WhatsApp. Tapi mengirim lewat nomor pribadi admin tidak punya jejak dan tidak bisa diandalkan.

Saya membangun integrasi penuh dengan WhatsApp Business Cloud API resmi dari Meta — dari pengiriman sampai pengelolaan templatenya, semuanya dari dalam aplikasi.

**Pengiriman.** Tujuh momen penting memicu pesan otomatis: pendaftaran terkirim, pembayaran diverifikasi, wawancara dijadwalkan, hasil wawancara lulus/tidak lulus, daftar ulang, dan penerimaan akhir. Pesan dikirim di latar belakang lewat antrean, sejajar dengan email dan saling bebas — satu kanal gagal tidak menjatuhkan yang lain.

**Riwayat & status baca.** Setiap pesan tercatat lengkap dengan perjalanannya: `pending` → `sent` → `delivered` → `read`, atau `failed`. Status `delivered` dan `read` datang dari webhook Meta, jadi admin bisa tahu apakah pesannya benar-benar dibaca — bukan sekadar terkirim.

**Pengelolaan template tanpa membuka Meta Business Manager.** Ini bagian yang paling banyak menyita waktu. Meta mewajibkan setiap pesan otomatis memakai template yang lolos review mereka lebih dulu. Alih-alih memaksa admin belajar antarmuka Meta, template disusun, diajukan, disunting, dan dihapus langsung dari panel — termasuk template yang lampirannya berupa dokumen PDF.

Satu aturan sederhana menjaga halamannya tidak pernah ambigu: **Draft** adalah template yang tidak ada di Meta, **Template** adalah template yang ada di Meta.

Aturan ini membuat sinkronisasi punya jawaban yang jelas untuk kasus sulitnya. Template yang hilang dari Meta tidak dihapus, melainkan **diturunkan kembali menjadi draft** dengan isinya utuh — karena pemetaan event dan variabel adalah data lokal yang tidak punya padanan di Meta dan tidak bisa dipulihkan oleh sinkronisasi berikutnya. Tapi statusnya sengaja tidak ikut menyala kembali secara otomatis, supaya notifikasi tidak pernah hidup diam-diam tanpa sepengetahuan admin.

![Template WhatsApp disusun dan diajukan ke Meta langsung dari panel, tanpa membuka Meta Business Manager](/images/ppdb/08-whatsapp-template.png)

![Riwayat pengiriman — status terkirim, sampai, dan dibaca ditarik dari webhook Meta](/images/ppdb/09-whatsapp-log.png)

## Hak akses antar-unit — dan sebuah regresi senyap di production

Lima unit berbagi satu panel admin, jadi batas siapa boleh melihat apa harus tegas. Saya meratakan hierarki peran menjadi empat (admin unit, bendahara, admin yayasan, super admin) dan mengeraskan isolasi datanya sampai ke level query — admin unit hanya melihat pendaftar, kuota, dan pengaturan unitnya sendiri, termasuk saat ia mencoba membuka URL milik unit lain secara langsung.

Bagian yang paling saya pelajari justru datang belakangan, dari sebuah laporan bug di production: setelah admin menambahkan satu hak akses baru ke peran admin unit, **seluruh tombol aksi di tabel pendaftaran mendadak hilang** untuk peran itu.

Penelusurannya berakhir di perilaku library yang tidak terlihat dari kode aplikasi. Saat sebuah peran disimpan lewat panel, library menyelaraskan hak aksesnya hanya berdasarkan kotak centang yang tampil di layar. Hak akses yang sah tetapi tidak punya kotak centang — karena berasal dari layar yang tidak menghasilkan checkbox otomatis — ikut tercabut diam-diam, setiap kali tombol Simpan ditekan. Tidak ada pesan error, tidak ada peringatan. Gejalanya baru terasa jauh setelahnya.

Perbaikannya bertumpu pada satu prinsip: **setiap hak akses yang pernah diberikan wajib punya kotak centang di panel.** Lima belas hak akses yang selama ini tidak pernah terender saya munculkan — dan yang penting, tanpa mengubah satu pun nama hak akses, sehingga perbaikan ini nol migrasi data dan nol risiko bagi peran yang sudah berjalan di production.

Dua hal yang tidak bisa disimpulkan dari membaca kode dan hanya ketahuan lewat penelusuran ini, keduanya saya catat sebagai keputusan tercatat agar tidak terulang:

- Model yang punya aturan otorisasi lengkap tapi tidak punya layarnya sendiri tidak pernah menghasilkan hak akses — meski aturannya ada dan berfungsi.
- Fungsi normalisasi nama yang dipakai library aman untuk sebagian nama hak akses, tetapi merusak sebagian lainnya. Dua kelompok itu karenanya butuh dua mekanisme berbeda untuk sampai ke layar.

![Halaman Peran & Hak Akses — setiap hak akses yang pernah diberikan kini punya kotak centangnya sendiri](/images/ppdb/10-peran-hak-akses.png)

## Mesin kuota, penerimaan, dan jalur beasiswa

Kuota adalah jantung sistem ini: ia menentukan siapa yang boleh mendaftar, kapan sebuah jalur ditutup, dan berapa siswa yang akhirnya diterima. Tiga aturan menjaganya tetap konsisten.

**Kursi berkurang saat diterima, bukan saat mendaftar.** Pendaftar yang belum tentu diterima tidak boleh mengunci kursi. Kuota hanya bergerak di dua titik: saat siswa diterima (berkurang) dan saat siswa mengundurkan diri (kembali). Submit form, penjadwalan wawancara, dan hasil wawancara sama sekali tidak menyentuhnya.

**Tertutup secara default.** Jalur pendaftaran hanya terbuka bila kuotanya memang sudah disiapkan, masih aktif, dan masih tersisa. Ketiadaan data tidak dibaca sebagai "bebas", melainkan sebagai "tutup" — sehingga tidak pernah ada pendaftaran yang lolos ke jalur yang belum dikonfigurasi.

**Penerimaan dijaga di titik eksekusi.** Jika kuota sudah penuh saat penerimaan diproses, prosesnya dibatalkan seluruhnya dan status pendaftar tidak berubah — bukan diterima lebih dulu lalu diperbaiki belakangan.

**Jalur Beasiswa** menuntut model yang berbeda, dan ini keputusan bisnis yang menarik. Penerima beasiswa bukan kursi tambahan — ia tetap menempati bangku kelas yang sama. Karena itu Beasiswa tidak diberi kuota sendiri, melainkan dimodelkan sebagai batas atas di dalam kuota Reguler: kursinya diambil dari pool Reguler, sementara jatah beasiswanya dibatasi terpisah. Konsekuensi yang perlu dipahami admin: menerima lima pendaftar beasiswa berarti kursi Reguler unit itu berkurang lima, bukan bertambah. Kalau dimodelkan sebagai pool terpisah, total penerimaan akan melebihi daya tampung riil kelas.

![Kuota per unit, program, jalur, dan tahun ajaran — Reguler, Inden, dan Beasiswa](/images/ppdb/11-kuota-pendaftaran.png)

## Cakupan lain

Di luar empat cerita di atas, berikut pekerjaan lain yang saya tangani.

| Area | Isi |
|---|---|
| Cek status mandiri | Wali memantau perkembangan pendaftarannya lewat tautan bertoken, tanpa perlu akun. Ditampilkan sebagai lini masa, bukan sekadar label status |
| Alur wawancara | Penjadwalan, pencatatan hasil, dan pengubahan jadwal langsung dari halaman detail pendaftar |
| Rekening pembayaran per unit | Biaya pendaftaran masuk ke rekening masing-masing unit, diatur unit itu sendiri. Unit yang belum mengisi rekening menampilkan peringatan yang melarang transfer — bukan diam-diam memakai rekening cadangan yang salah |
| Dokumen surat pernyataan | Surat pernyataan yayasan diunggah sekali, lalu otomatis terlampir di email dan pesan WhatsApp pada momen yang relevan |
| Riwayat email | Setiap email yang dikirim tercatat beserta statusnya, dan bisa dikirim ulang dari panel |
| Panel admin sebagai aplikasi ponsel | Panel dapat dipasang di layar utama ponsel (PWA), berguna bagi admin unit yang bertugas di lapangan |
| Dasbor, navigasi, dan tema | Konsolidasi panel, pengelompokan menu, widget ringkasan, serta tema visual yang selaras dengan halaman publik |
| Perombakan mesin formulir | Definisi field pendaftaran dipindah dari basis data ke konfigurasi terstruktur, membuat perbedaan formulir antar-jenjang dan antar-program jauh lebih mudah ditelusuri |
| Infrastruktur | Redis untuk antrean dan cache, pekerja antrean sebagai layanan yang otomatis hidup kembali, serta penyeragaman konfigurasi antar-lingkungan |

![Cek status mandiri lewat tautan bertoken, ditampilkan sebagai lini masa](/images/ppdb/12-cek-status.png)

![Informasi pembayaran menampilkan rekening milik unit tempat pendaftar mendaftar](/images/ppdb/13-informasi-pembayaran.png)

## Keputusan teknis

| Tantangan | Keputusan | Manfaatnya |
|---|---|---|
| Kapan kuota dianggap terpakai? | Kuota berkurang saat siswa **diterima**, bukan saat mendaftar | Kursi tidak terkunci oleh pendaftar yang belum tentu diterima |
| Jumlah diterima bisa melebihi kuota tanpa disadari | Penerimaan ditolak bila kuota penuh, dan kursi dibebaskan kembali bila siswa mengundurkan diri | Jumlah yang diterima selalu sesuai daya tampung |
| Pendaftaran bisa terbuka padahal kuota belum diatur | Pendaftaran **tertutup secara default** — hanya terbuka bila kuotanya sudah disiapkan dan masih tersisa | Mencegah penerimaan yang tidak diinginkan |
| Pengiriman email & WhatsApp memperlambat proses pendaftaran | Keduanya dikirim di latar belakang lewat antrean, tidak menahan proses pengguna, dan saling bebas | Pendaftaran terasa cepat; satu kanal gagal tidak menjatuhkan yang lain |
| Template WhatsApp hilang dari Meta — hapus atau pertahankan? | **Diturunkan jadi draft**, isinya utuh, tapi statusnya tidak menyala otomatis | Pemetaan event & variabel tidak hilang, dan notifikasi tidak pernah hidup diam-diam |
| Rekening pembayaran dipindah dari yayasan ke tiap unit — perlu nilai cadangan? | **Tanpa nilai cadangan.** Unit yang belum mengisi menampilkan peringatan yang melarang transfer | Salah transfer ke kas unit lain lolos rekonsiliasi karena nominalnya cocok; halaman kosong justru langsung dilaporkan. Kegagalan konfigurasi dibuat berisik, bukan senyap |

Saya juga membiasakan mendokumentasikan alasan di balik setiap keputusan teknis, bukan hanya hasilnya, agar sistem mudah dirawat dan dilanjutkan ke depan.

## Kualitas & keandalan

- **Diuji secara otomatis** — 501 pengujian otomatis menjaga fungsi-fungsi penting agar tidak diam-diam rusak saat fitur baru ditambahkan.
- **Rilis otomatis, bertahap, dan bernomor** — perubahan mengalir lewat lingkungan uji sebelum production, diterapkan lewat proses otomatis, dan tiap rilis punya nomor versi serta catatan rilisnya sendiri.
- **Catatan rilis yang jujur** — tiap catatan rilis memuat langkah manual pasca-rilis dan daftar utang terbuka, termasuk hal-hal yang belum sempat diverifikasi. Bagian ini yang paling sering menyelamatkan kami saat rilis berikutnya.
- **Hak akses berjenjang** — tiap peran hanya bisa mengakses bagian yang menjadi tanggung jawabnya, dan tiap unit hanya melihat datanya sendiri.
- **Jejak audit** — perubahan penting dan aktivitas masuk admin tercatat, dan catatannya tidak bisa disunting dari panel.
- **Dokumentasi yang dirawat** — setiap fitur yang rilis punya dokumennya sendiri, dan keputusan teknis yang tidak bisa disimpulkan dari membaca kode dicatat terpisah beserta alasannya.

## Hasil & pembelajaran

- Menghadirkan kemampuan inti yang sebelumnya tidak ada: pelacakan tahun inden, pengelolaan tahun ajaran dan kuota, serta kanal notifikasi resmi ke wali.
- Menyederhanakan proses tahunan yang paling membebani admin menjadi satu alur terpandu.
- Menegakkan batas data antar-unit, sehingga satu panel bisa dipakai bersama lima unit tanpa saling mengintip.
- Aplikasinya kini melayani PPDB seluruh unit sekolah di bawah yayasan.

**Pembelajaran pertama — kenyamanan admin sama pentingnya dengan kenyamanan pengguna akhir.** Fitur yang secara teknis benar tetap gagal kalau alurnya membuat admin kewalahan; butuh tiga iterasi sampai alur pembukaan tahun ajaran benar-benar terasa ringkas.

**Pembelajaran kedua — kegagalan yang senyap jauh lebih mahal daripada kegagalan yang berisik.** Hak akses yang hilang tanpa pesan apa pun baru ketahuan setelah admin kehilangan tombol kerjanya di production. Sejak itu, setiap kali saya dihadapkan pada pilihan antara "diam-diam pakai nilai cadangan" dan "berhenti sambil menjelaskan apa yang kurang", saya memilih yang kedua.

---

*Studi kasus ini tidak menyertakan kode sumber, kata sandi, alamat situs, maupun data pribadi nyata. Seluruh tangkapan layar menggunakan data dummy. Repositori bersifat privat.*
