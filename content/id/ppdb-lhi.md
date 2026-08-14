---
title: "Sistem Penerimaan Peserta Didik Baru (PPDB)"
slug: "ppdb-lhi"
client: "Sekolah Islam Terpadu LHI"
role: "Pengembang aplikasi berbasis website"
team: "Tim IT SIT LHI (2 orang)"
period: "2026"
status: "Pra-produksi tahap uji terima dengan data uji"
domain: "Teknologi pendidikan"
stack: ["Laravel", "Filament", "Livewire", "Tailwind CSS", "Docker"]
summary: "Membangun lapisan pengelolaan tahun ajaran dan kuota untuk sistem pendaftaran multi-unit sekolah."
cover: "/images/ppdb/01-landing.png"
featured: true
order: 2
confidential: true
repo: null            # null = repositori privat
metrics:
  - label: "Unit sekolah dilayani"
    value: "TODO"        # PAUD, SD, SMP, SMA → berapa unit tepatnya?
  - label: "Jalur pendaftaran"
    value: "TODO"        # Reguler, Inden, Pindahan → total kombinasi program × jalur?
  - label: "Menu admin dipadatkan"
    value: "TODO → 3"    # dari berapa menu terpisah menjadi 3 langkah wizard?
  - label: "Iterasi desain wizard"
    value: "3"
---

## Ringkasan

Sekolah Islam Terpadu LHI menaungi beberapa unit sekolah dengan karakteristik berbeda — jenjang SMP dan SMA punya program (Boarding) dan jalur pendaftaran (Reguler, Inden, Pindahan) sendiri-sendiri. Satu aplikasi melayani semuanya, dengan data tiap sekolah terpisah.

Sistem lama punya keterbatasan yang menyulitkan admin, dan yang paling terasa: **admin tidak bisa melacak tahun masuk yang dipesan calon siswa.** Sistem hanya mencatat kapan seseorang mendaftar, bukan untuk tahun ajaran mana ia memesan kursi.

Saya bergabung melanjutkan pengembangan aplikasi penggantinya. Di atas fondasi yang sudah ada, saya membangun lapisan pengelolaan yang sebelumnya tidak tersedia: pengelolaan tahun ajaran dan kuota per sekolah, alur terpandu untuk membuka tahun ajaran baru, serta penguatan aturan penerimaan agar jumlah siswa selalu sesuai daya tampung.

![Halaman pendaftaran online — sisi orang tua/wali](/images/ppdb/01-landing.png)

![Formulir pendaftaran bertahap, dapat diakses dari ponsel](/images/ppdb/02-form-pendaftaran.png)

## Masalah

**Tahun inden tidak terlacak.** Admin hanya melihat kapan seseorang mendaftar, bukan untuk tahun ajaran mana kursi itu dipesan. Perencanaan kuota dan komunikasi ke orang tua jadi menebak-nebak.

**Kuota tidak punya tempat di sistem.** Daya tampung per sekolah, program, dan jalur tidak tercatat, sehingga tidak ada yang bisa dijadikan acuan saat memutuskan penerimaan.

**Jumlah diterima bisa melampaui daya tampung tanpa disadari.** Tanpa kuota terekam, tidak ada pengaman apa pun di titik penerimaan.

**Pembukaan tahun ajaran adalah proses manual yang membebani.** Mengatur kuota, mengaktifkan tahun ajaran, dan melebur sisa kursi inden dikerjakan satu per satu di beberapa menu terpisah — sekali setahun, dengan risiko kesalahan yang tinggi.

## Peran saya

Saya tidak membangun aplikasi ini dari nol. Saat saya bergabung, fondasi awal sudah dikerjakan oleh rekan setim. Saya melanjutkan dan mengembangkannya secara signifikan.

| Sudah ada saat saya bergabung | Yang saya bangun |
|---|---|
| Form pendaftaran online dasar | Alur terpandu pembukaan tahun ajaran (wizard) |
| Halaman publik (pendaftaran, info pembayaran, bukti daftar) | Mesin pengelolaan kuota & kursi (terima/mundur) |
| Pemisahan data antar-sekolah | Aturan pendaftaran "tertutup default" |
| Proses rilis otomatis (CI/CD) dasar | Notifikasi email otomatis di latar belakang |
| | Perombakan mesin formulir & perbaikan alur |

Singkatnya: alur pendaftaran untuk orang tua sudah ada; **saya membangun lapisan pengelolaan untuk admin** dan menguatkan keandalan sistem.

![Dasbor admin — ringkasan tahun ajaran aktif](/images/ppdb/03-dashboard-admin.png)

![Pengelolaan data pendaftar](/images/ppdb/07-daftar-pendaftaran.png)

## Fitur unggulan: alur pembukaan tahun ajaran

Setelah kuota dan tahun ajaran masuk ke sistem, muncul tantangan baru. Membukanya untuk tahun berikutnya menuntut admin menyentuh beberapa menu terpisah secara berurutan — dan urutannya harus benar. Admin kewalahan.

Solusinya satu alur terpandu tiga langkah:

1. Admin memilih tahun ajaran yang akan diaktifkan.
2. Admin mengisi kuota hanya untuk tahun terbaru yang belum diatur — sisanya dihitung sistem.
3. Sistem menyelesaikan semuanya sekaligus: membuat kuota, melebur sisa kursi inden, mengaktifkan tahun ajaran.

Yang membuat ini berhasil bukan fiturnya, tapi kesederhanaannya. Butuh tiga iterasi desain sampai alurnya benar-benar ringkas — versi-versi awal masih meminta admin mengisi data yang sebenarnya sudah ada di sistem.

![Langkah 1 — pilih tahun ajaran; sistem menandai tahun yang akan dibuat otomatis](/images/ppdb/04-wizard-langkah-1.png)

![Langkah 2 — admin mengisi total kuota; porsi Inden (30%) dan Reguler (70%) dihitung otomatis per sekolah](/images/ppdb/05-wizard-langkah-2.png)

![Langkah 3 — ringkasan lengkap sebelum dieksekusi](/images/ppdb/06-wizard-langkah-3.png)

## Keputusan teknis

| Tantangan | Keputusan | Alasan |
|---|---|---|
| Kapan kuota dianggap terpakai? | Kuota berkurang saat siswa **diterima**, bukan saat mendaftar | Kursi tidak terkunci oleh pendaftar yang belum tentu diterima |
| Penerimaan bisa melebihi kuota | Sistem menolak penerimaan bila kuota penuh, dan membebaskan kursi bila siswa mengundurkan diri | Jumlah diterima selalu sesuai daya tampung |
| Pendaftaran bisa terbuka padahal kuota belum diatur | Pendaftaran **tertutup secara default** — hanya terbuka bila kuota sudah disiapkan dan masih tersisa | Mencegah penerimaan yang tidak diinginkan |
| Pengiriman email memperlambat pendaftaran | Email konfirmasi dikirim di latar belakang | Pendaftaran terasa cepat, email tetap terkirim andal |

Saya juga membiasakan mendokumentasikan alasan di balik setiap keputusan teknis, bukan hanya hasilnya, agar sistem mudah dirawat dan dilanjutkan.

## Kualitas & keandalan

- **Rilis otomatis** — perubahan diuji dan diterapkan lewat pipeline CI/CD.
- **Pengujian otomatis** — fungsi-fungsi penting punya test agar tidak rusak saat fitur baru masuk.
- **Hak akses berjenjang** — tiap peran (admin pusat, admin unit) hanya mengakses bagian yang jadi tanggung jawabnya.

## Hasil & pembelajaran

Sistem menghadirkan kemampuan inti yang sebelumnya tidak ada — pelacakan tahun inden serta pengelolaan tahun ajaran dan kuota — dan memadatkan proses tahunan yang paling membebani admin menjadi satu alur terpandu.

**Pembelajaran utama:** kenyamanan admin sama pentingnya dengan kenyamanan pengguna akhir. Fitur yang secara teknis benar tetap gagal kalau alurnya membuat admin kewalahan. Butuh tiga iterasi sampai alur pembukaan tahun ajaran terasa ringkas.

---

*Studi kasus ini tidak menyertakan kode sumber, kredensial, maupun data pribadi. Seluruh tangkapan layar menggunakan data uji. Repositori bersifat privat.*
