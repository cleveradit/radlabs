---
# Teks landing page. SEMUA teks yang tampil di halaman dibaca dari sini.
#
# Bertanda [GANTI: ...] = fakta yang belum saya punya. Dirender apa adanya,
# jangan dihapus dan jangan ditebak isi sendiri lalu tandanya hilang.
#
# Nada: netral dan ringkas. Halaman ini memperkenalkan orang, bukan
# menawarkan jasa. Hindari superlatif dan janji hasil. Klausa pembanding
# ("bukan X", "bukan hanya X") boleh dipakai seperlunya.
#
# Gaya kalimat: kurangi kata "saya". Di Tentang cukup satu, sebagai
# jangkar di paragraf pertama; paragraf berikutnya tanpa subjek atau
# memakai pekerjaan/benda sebagai subjek. Hindari titik dua di dalam
# kalimat; pecah jadi kalimat baru atau sambung dengan koma.

meta:
  siteName: "radlabs"
  siteNameExpansion: "radityo laboratorium"
  url: "https://radlabs.my.id"
  description: "Radityo Dwiki Putra Hamas — Web Developer & System Analyst di LHI International Islamic School, Surabaya. Menganalisis dan membangun sistem internal sekolah, termasuk sistem penerimaan murid baru yang dipakai lima unit sekolah. Laravel, Filament, Docker."

# Tautan navigasi. Urutannya = urutan seksi di halaman, dan nomor seksi
# digenerate dari urutan ini.
nav:
  - label: "Tentang"
    href: "#tentang"
  - label: "Pengalaman"
    href: "#pengalaman"
  - label: "Keahlian"
    href: "#keahlian"
  - label: "Penelitian"
    href: "#penelitian"
  - label: "Kontak"
    href: "#kontak"

hero:
  eyebrow: "Surabaya, Indonesia"
  name: "Radityo Dwiki Putra Hamas"
  # Ditampilkan bergantian. Kata pertama tiap peran = baris pertama,
  # sisanya = baris kedua berwarna aksen.
  roles:
    - "Web Developer"
    - "System Analyst"
  lede: "Laravel · Filament · PHP · Docker"
  # Kata raksasa samar di latar hero. Dekoratif, disembunyikan dari
  # pembaca layar.
  backdrop: "radLabs"
  actions:
    - label: "Lihat penelitian"
      href: "#penelitian"
      variant: "primary"
    - label: "Kontak"
      href: "#kontak"
      variant: "outline"

tentang:
  title: "Tentang"
  paragraphs:
    - "Sebagai lulusan Sistem Informasi, saya bekerja di dua sisi sebuah sistem, memahami masalah operasionalnya sekaligus membangun perangkat lunak yang menyelesaikannya."
    - "Kini menjabat sebagai IT Specialist di LHI International Islamic School, yayasan dengan lima unit sekolah, dengan fokus pengembangan web. Sehari-hari menganalisis dan membangun sistem internal sekolah, termasuk sistem penerimaan murid baru (SPMB) yang sudah dipakai seluruh unit. Pekerjaannya mencakup menggali kebutuhan langsung ke admin di lapangan, merumuskan aturan yang berlaku menjadi perilaku sistem, sampai implementasi dengan Laravel, Filament, Docker, dan GitHub Actions."
    - "Saat kebutuhan belum jelas, langkah pertama yang diambil adalah menanyakan \"masalah apa yang dihadapi\" sebelum \"halaman apa yang dibutuhkan\". Dari situ, solusi yang diusulkan berangkat dari masalah nyata dan tetap realistis untuk dibangun."
    - "Google Project Management Professional Certificate memperkuat cara merencanakan pekerjaan dan berkomunikasi dengan pemangku kepentingan."
  pendidikan:
    title: "Pendidikan"
    items:
      - title: "Sarjana Sistem Informasi"
        org: "Universitas Brawijaya"
        period: "Agustus 2018 - Januari 2025"
      - title: "Google Project Management Professional Certificate"
        org: "Coursera"
        period: "2026"
        note: "Sertifikat terverifikasi."
        href: "https://www.coursera.org/verify/professional-cert/1N9BWR1AQS1D"

pengalaman:
  title: "Pengalaman"
  items:
    - role: "IT Specialist"
      org: "LHI International Islamic School"
      period: "Januari 2026 - Sekarang"
      summary: "Menganalisis, membangun, dan merawat sistem internal sekolah untuk yayasan dengan lima unit sekolah."
      points:
        - "Mengembangkan lanjutan sistem penerimaan murid baru (SPMB) yang kini dipakai seluruh unit, dan tetap merawatnya di production."
        - "Menggali kebutuhan langsung ke admin di lapangan dan merumuskan aturan yang berlaku menjadi perilaku sistem."
        - "Mengusulkan kanal notifikasi resmi ke wali lewat email dan WhatsApp Business; usulan diterima."
        - "Menerapkan prinsip Domain-Driven Design, deploy Docker di VPS, dan rilis otomatis lewat GitHub Actions."
    - role: "Pengembang web - Freelance"
      org: "Klien sektor kesehatan"
      period: "Mei 2025 - Desember 2025"
      status: ""
      summary: "Membangun aplikasi web rekam medis bersama satu developer lain."
      points:
        - "Memegang sebagian besar pertemuan dengan klien, penggalian, dan klarifikasi kebutuhan."
        - "Saat revisi terus berulang, menggeser fokus dari mengerjakan permintaan ke memahami masalah operasional klien, lalu mengusulkan solusi sebelum implementasi dilanjutkan."
        - "Ikut mengembangkan aplikasi bersama rekan."
    - role: "Pengembang web - Freelance"
      org: "Bumi Lestari Perkasa"
      period: "September 2023 - November 2023"
      status: ""
      summary: "Aplikasi kasir dan pengolahan data penjualan berbasis web, dikerjakan tim dua orang."
      points:
        - "Bergabung saat proyek sudah berjalan sebulan dan klien terus menambah permintaan halaman baru setiap minggu."
        - "Mengganti pendekatan dengan menanyakan masalah apa yang ingin diselesaikan klien, bukan hanya halaman apa yang diinginkan."
        - "Menerjemahkan masalah klien menjadi usulan solusi untuk developer, disesuaikan dengan kemampuan tim."
        - "Menjadi penghubung dengan klien sekaligus mengerjakan fitur ringan; rekan mengerjakan fitur besar. PHP, JavaScript, CodeIgniter."
        - "Permintaan baru di tiap pertemuan berkurang, timeline lebih terkontrol, dan aplikasi dipakai untuk operasional bisnis."
    - role: "Magang"
      org: "Pemerintah Provinsi Jawa Timur"
      period: "Januari 2023 - Februari 2023"
      status: ""
      summary: "Mengembangkan website serta mengelola dan merekapitulasi data aset Pemerintah Provinsi Jawa Timur."
      points: 
        - "Mengembangkan dan memelihara website untuk mendukung operasional instansi."
        - "Mendata dan mencatat informasi aset yang dimiliki oleh Pemerintah Provinsi Jawa Timur."
        - "Melakukan rekapitulasi data aset untuk memastikan kelengkapan dan keteraturan administrasi."
    - role: "Peserta Studi Independen AI/ML — Kampus Merdeka"
      org: "PT Orbit Ventura Indonesia"
      period: "Februari 2022 - Juli 2022"
      status: ""
      summary: "Mempelajari machine learning model, deep learning, dan membuat proyek akhir berupa forecasting"
      points: []

keahlian:
  title: "Keahlian"
  groups:
    - title: "Analisis sistem"
      items:
        [
          "Analisis kebutuhan",
          "Analisis proses bisnis",
          "Perumusan aturan bisnis",
          "Penerjemahan kebutuhan ke tiket",
        ]
    - title: "Backend"
      items: ["PHP", "Laravel", "Filament", "Livewire", "MySQL", "Redis"]
    - title: "Arsitektur & kualitas"
      items:
        [
          "Domain-Driven Design",
          "Pemisahan modul",
          "Pengujian otomatis",
          "Dokumentasi keputusan teknis",
        ]
    - title: "Infrastruktur & rilis"
      items: ["Docker", "VPS", "GitHub Actions", "CI/CD"]
    - title: "Integrasi & frontend"
      items:
        [
          "WhatsApp Business Cloud API",
          "Tailwind CSS",
          "JavaScript",
          "React & TypeScript",
        ]
    - title: "Lainnya"
      items:
        [
          "Python",
          "Machine learning & forecasting",
          "Manajemen proyek (sertifikasi Google)",
        ]

penelitian:
  title: "Penelitian"
  intro: "Studi kasus sistem yang saya kerjakan."
  backLabel: "← Semua penelitian"
  catalogPrefix: "P-"

kontak:
  title: "Kontak"
  intro: "Paling mudah lewat email. Tautan lain ada di bawah."
  links:
    - label: "Email"
      value: "radityodwiki@gmail.com"
      href: "mailto:radityodwiki@gmail.com"
    - label: "GitHub"
      value: "cleveradit"
      href: "https://github.com/cleveradit"
    - label: "LinkedIn"
      value: "Radityo Dwiki Putra Hamas"
      href: "https://www.linkedin.com/in/radityo-dwiki/"

notFound:
  heading: "404"
  body: "Halaman yang kamu cari tidak ada di sini."
  backLabel: "Kembali ke beranda"

footer:
  text: "radlabs · 2026"
---
