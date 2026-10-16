---
# Teks landing page. SEMUA teks yang tampil di halaman dibaca dari sini.
# Padanan bahasa Inggrisnya ada di content/en/site.md. Kunci keduanya
# wajib sama.
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
#
# Penanda yang dikenali:
#   **teks**   → penekanan (dirender tebal, warna ink)
#   {n}, {first}, {last} → angka yang dihitung dari data, jangan ditulis manual

meta:
  siteName: "radlabs"
  siteNameExpansion: "radityo laboratorium"
  url: "https://radlabs.my.id"
  description: "Radityo Dwiki Putra Hamas, Web Developer & System Analyst di LHI School - Yogyakarta. Menganalisis dan membangun sistem internal sekolah, termasuk sistem penerimaan murid baru yang dipakai lima unit sekolah. Laravel, Filament, Docker."

# Label antarmuka: nama aksesibel tombol, label navigasi, dsb.
ui:
  navLabel: "Navigasi utama"
  railLabel: "Indikator seksi"
  menuOpen: "Buka menu navigasi"
  menuClose: "Tutup menu navigasi"
  themeToLight: "Ganti ke tema terang"
  themeToDark: "Ganti ke tema gelap"
  # Tombol bahasa menyebut bahasa TUJUAN.
  langSwitch:
    label: "EN"
    srLabel: "English version"

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
  # Label titik hero di rel indikator samping.
  railLabel: "LAB-00"
  status: "Lab status: aktif"
  eyebrow: "Surabaya, Indonesia"
  welcome: "Selamat datang di Radityo Laboratorium"
  name: "Radityo Dwiki Putra Hamas"
  intro: "Ruang kerja dan eksperimen rekayasa perangkat lunak tempat saya **membedah masalah operasional nyata di lapangan** lalu merakitnya menjadi **sistem web yang teruji di production**."
  lede: "Laravel · Filament · PHP · Docker · Domain-Driven Design"
  # Ditampilkan bergantian. Kata pertama tiap peran warna ink, sisanya
  # warna aksen. Urutannya berpasangan dengan labNote.notes.
  roles:
    - "Web Developer"
    - "System Analyst"
  labNote:
    label: "Catatan lab"
    live: "Live log"
    notes:
      - code: "MOD-01"
        title: "Eksperimen & konstruksi kode"
        desc: "Menerjemahkan aturan bisnis sekolah & operasional menjadi modul terpisah dengan Laravel, Filament, Docker, dan rilis otomatis."
      - code: "MOD-02"
        title: "Observasi & analisis sistem"
        desc: "Menggali kebutuhan langsung ke admin di lapangan, menanyakan masalah apa yang dihadapi sebelum menentukan halaman apa yang dibangun."
    stationsLabel: "Stasiun riset"
    stationsValue: "{n} bagian utama"
    archiveLabel: "Arsip studi kasus"
    archiveValue: "{first} s.d. {last}"
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
  scrollHint: "Masuk ke ruang observasi"

tentang:
  eyebrow: "Profil peneliti"
  title: "Tentang"
  description: "Latar belakang disiplin Sistem Informasi dan metodologi yang digunakan saat membedah masalah di dalam laboratorium."
  hypothesis:
    label: "Hipotesis kerja utama"
    text: "Tanyakan **masalah apa yang dihadapi** sebelum menanyakan **halaman apa yang dibutuhkan**."
  paragraphs:
    - "Sebagai lulusan Sistem Informasi, saya bekerja di dua sisi sebuah sistem, memahami masalah operasionalnya sekaligus membangun perangkat lunak yang menyelesaikannya."
    - "Kini menjabat sebagai **staff IT di LHI School - Yogyakarta**, yayasan dengan lima unit sekolah, dengan fokus pengembangan web. Sehari-hari menganalisis dan membangun sistem internal sekolah, termasuk **sistem penerimaan murid baru (SPMB)** yang sudah dipakai seluruh unit. Pekerjaannya mencakup menggali kebutuhan langsung ke admin di lapangan, merumuskan aturan yang berlaku menjadi perilaku sistem, sampai implementasi dengan Laravel, Filament, Docker, dan GitHub Actions."
    - "Saat kebutuhan belum jelas, langkah pertama yang diambil adalah menanyakan \"masalah apa yang dihadapi\" sebelum \"halaman apa yang dibutuhkan\". Dari situ, solusi yang diusulkan berangkat dari masalah nyata dan tetap realistis untuk dibangun."
    - "**Google Project Management Professional Certificate** memperkuat cara merencanakan pekerjaan dan berkomunikasi dengan pemangku kepentingan."
  pendidikan:
    title: "Pendidikan & kredensial"
    verifyLabel: "↗ Verifikasi"
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
  eyebrow: "Log lapangan"
  title: "Pengalaman"
  description: "Pilih catatan penugasan untuk menginspeksi masalah operasional dan solusi yang diterapkan."
  tabsLabel: "Log pengalaman"
  prevLabel: "Pengalaman sebelumnya"
  nextLabel: "Pengalaman berikutnya"
  logLabel: "Log penugasan"
  codePrefix: "EXP-"
  # tabRole / tabPeriod: versi ringkas untuk tombol tab (opsional).
  # current: true → periode diberi warna aksen (posisi yang sedang berjalan).
  items:
    - role: "Staff IT"
      org: "LHI School - Yogyakarta"
      period: "Januari 2026 - Sekarang"
      tabPeriod: "2026 – Kini"
      current: true
      summary: "Menganalisis, membangun, dan merawat sistem internal sekolah untuk yayasan dengan lima unit sekolah."
      points:
        - "Mengembangkan lanjutan **sistem penerimaan murid baru (SPMB)** yang kini dipakai seluruh unit, dan tetap merawatnya di production."
        - "Menggali kebutuhan langsung ke admin di lapangan dan merumuskan aturan yang berlaku menjadi perilaku sistem."
        - "Mengusulkan kanal notifikasi resmi ke wali lewat **email dan WhatsApp Business**; usulan diterima."
        - "Menerapkan prinsip **Domain-Driven Design**, deploy Docker di VPS, dan rilis otomatis lewat GitHub Actions."
      tags: ["Laravel", "Filament", "Domain-Driven Design", "Docker", "GitHub Actions", "WhatsApp Business"]
    - role: "Pengembang web - Freelance"
      org: "Klien sektor kesehatan"
      period: "Mei 2025 - Desember 2025"
      tabPeriod: "Mei – Des 2025"
      summary: "Membangun aplikasi web rekam medis bersama satu developer lain."
      points:
        - "Memegang sebagian besar pertemuan dengan klien, penggalian, dan klarifikasi kebutuhan."
        - "Saat revisi terus berulang, **menggeser fokus dari mengerjakan permintaan ke memahami masalah operasional klien**, lalu mengusulkan solusi sebelum implementasi dilanjutkan."
        - "Ikut mengembangkan aplikasi bersama rekan."
      tags: ["Analisis Kebutuhan", "Aplikasi Rekam Medis", "Komunikasi Klien", "Web Development"]
    - role: "Pengembang web - Freelance"
      org: "Bumi Lestari Perkasa"
      period: "September 2023 - November 2023"
      tabPeriod: "Sep – Nov 2023"
      summary: "Aplikasi kasir dan pengolahan data penjualan berbasis web, dikerjakan tim dua orang."
      points:
        - "Bergabung saat proyek sudah berjalan sebulan dan klien terus menambah permintaan halaman baru setiap minggu."
        - "Mengganti pendekatan dengan **menanyakan masalah apa yang ingin diselesaikan klien**, bukan hanya halaman apa yang diinginkan."
        - "Menerjemahkan masalah klien menjadi usulan solusi untuk developer, disesuaikan dengan kemampuan tim."
        - "Menjadi penghubung dengan klien sekaligus mengerjakan fitur ringan; rekan mengerjakan fitur besar."
        - "**Permintaan baru di tiap pertemuan berkurang, timeline lebih terkontrol**, dan aplikasi dipakai untuk operasional bisnis."
      tags: ["PHP", "JavaScript", "CodeIgniter", "Analisis Masalah"]
    - role: "Magang"
      org: "Pemerintah Provinsi Jawa Timur"
      period: "Januari 2023 - Februari 2023"
      tabPeriod: "Jan – Feb 2023"
      summary: "Mengembangkan website serta mengelola dan merekapitulasi data aset Pemerintah Provinsi Jawa Timur."
      points:
        - "Mengembangkan dan memelihara website untuk mendukung operasional instansi."
        - "Mendata dan mencatat informasi aset yang dimiliki oleh Pemerintah Provinsi Jawa Timur."
        - "Melakukan rekapitulasi data aset untuk memastikan kelengkapan dan keteraturan administrasi."
      tags: ["Pemeliharaan Web", "Manajemen Data Aset", "Rekapitulasi Administrasi"]
    - role: "Peserta Studi Independen AI/ML, Kampus Merdeka"
      tabRole: "Studi Independen AI/ML"
      org: "PT Orbit Ventura Indonesia"
      period: "Februari 2022 - Juli 2022"
      tabPeriod: "Feb – Jul 2022"
      summary: "Mempelajari machine learning model, deep learning, dan membuat proyek akhir berupa forecasting."
      points: []
      tags: ["Python", "Machine Learning", "Deep Learning", "Forecasting"]

keahlian:
  eyebrow: "Instrumen lab"
  title: "Keahlian"
  description: "Perangkat analisis, arsitektur perangkat lunak, dan perkakas infrastruktur yang digunakan di dalam laboratorium."
  summary:
    label: "Kategori instrumen"
    value: "{n} unit"
    text: "Mencakup hulu (analisis kebutuhan & aturan bisnis) hingga hilir (implementasi kode, kontainerisasi, & rilis otomatis)."
  codePrefix: "LAB-"
  # highlight: item yang diberi latar aksen (alat utama).
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
      highlight: ["PHP", "Laravel", "Filament"]
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
      highlight: ["Docker"]
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
  eyebrow: "Arsip eksperimen"
  title: "Penelitian"
  description: "Studi kasus sistem dan eksperimen teknis yang saya kerjakan di dalam laboratorium."
  countLabel: "{n} berkas penelitian"
  hint: "Klik salah satu kartu eksperimen ({first} s.d. {last}) untuk membuka **lembar observasi lab**."
  cardAction: "Buka lembar lab →"
  repoLabel: "↗ GitHub"
  privateRepoLabel: "Repositori privat"
  catalogPrefix: "P-"
  backLabel: "← Semua penelitian"
  dialog:
    label: "Berkas lab //"
    problemLabel: "01. Observasi masalah lapangan"
    solutionLabel: "02. Rancangan & eksperimen sistem"
    openLabel: "Buka artikel penelitian →"
    closeLabel: "Tutup berkas"
    closeSrLabel: "Tutup lembar observasi"
  # Halaman detail penelitian.
  dataSheetLabel: "Lembar data"
  manifest:
    role: "Peran"
    team: "Tim"
    period: "Periode"
    status: "Status"
    stack: "Stack"
    repo: "Repo"

kontak:
  eyebrow: "Kanal transmisi"
  title: "Kontak"
  description: "Paling mudah lewat email. Tautan lain ada di samping untuk terhubung atau berdiskusi seputar sistem dan rekayasa web."
  copyLabel: "Salin email"
  copiedLabel: "✓ Email tersalin"
  sendLabel: "Kirim ↗"
  # Tautan mailto: dirender sebagai kartu email (salin + kirim).
  # display: teks di kaki kartu tautan lain.
  links:
    - label: "Email"
      value: "radityodwiki@gmail.com"
      href: "mailto:radityodwiki@gmail.com"
    - label: "GitHub"
      value: "cleveradit"
      href: "https://github.com/cleveradit"
      display: "github.com/cleveradit →"
    - label: "LinkedIn"
      value: "Radityo Dwiki Putra Hamas"
      href: "https://www.linkedin.com/in/radityo-dwiki/"
      display: "linkedin.com/in/radityo-dwiki →"
  backToTop: "↑ Kembali ke pintu masuk lab"

notFound:
  heading: "404"
  body: "Halaman yang kamu cari tidak ada di sini."
  backLabel: "Kembali ke beranda"

footer:
  text: "radlabs · 2026"
---
