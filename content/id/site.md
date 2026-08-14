---
# Teks landing page. SEMUA teks yang tampil di halaman dibaca dari sini.
#
# Bertanda [GANTI: ...] = fakta yang belum saya punya. Dirender apa adanya,
# jangan dihapus dan jangan ditebak — isi sendiri lalu tandanya hilang.
#
# Nada: netral dan ringkas. Halaman ini memperkenalkan orang, bukan
# menawarkan jasa. Hindari klausa pembanding ("bukan X"), superlatif,
# dan janji hasil.

meta:
  siteName: "radlabs"
  siteNameExpansion: "radityo laboratorium"
  url: "https://radlabs.my.id"
  description: "Radityo Dwiki Putra Hamas — IT Specialist di LHI International Islamic School, Surabaya. Sistem internal sekolah: kepegawaian, data akademik, dan penerimaan siswa baru. Laravel, Filament, Docker."

# Tautan navigasi. Urutannya = urutan seksi di halaman, dan nomor seksi
# digenerate dari urutan ini.
nav:
  - label: "Tentang"
    href: "#tentang"
  - label: "Pengalaman"
    href: "#pengalaman"
  - label: "Pendidikan"
    href: "#pendidikan"
  - label: "Keahlian"
    href: "#keahlian"
  - label: "Karya"
    href: "#karya"
  - label: "Kontak"
    href: "#kontak"

hero:
  eyebrow: "Surabaya, Indonesia"
  name: "Radityo Dwiki Putra Hamas"
  role: "IT Specialist"
  lede: "Membangun sistem internal sekolah di LHI International Islamic School — kepegawaian, data akademik, dan penerimaan siswa baru. Laravel, Filament, dan Docker, di atas arsitektur Domain-Driven Design."
  photo: "/images/profil.jpg"
  actions:
    - label: "Lihat karya"
      href: "#karya"
      variant: "primary"
    - label: "Kontak"
      href: "#kontak"
      variant: "outline"

tentang:
  title: "Tentang"
  paragraphs:
    - "Sarjana Sistem Informasi Universitas Brawijaya, berbasis di Surabaya. Sekarang IT Specialist di LHI International Islamic School, membangun sistem internal sekolah dengan Laravel, Filament, dan MySQL di atas arsitektur Domain-Driven Design."
    - "Sebelumnya mengerjakan aplikasi kasir berbasis web sebagai freelance dan magang di Pemerintah Provinsi Jawa Timur. Titik awalnya bukan pengembangan web, melainkan machine learning dan forecasting di PT Orbit Ventura Indonesia."
    - "Kebiasaan kerja saya sederhana: membaca kebutuhan langsung dari orang yang akan memakainya, memecah satu sistem jadi modul terpisah, dan merilis lewat pipeline otomatis. Alasan di balik setiap keputusan teknis ikut didokumentasikan, bukan cuma hasilnya."

pengalaman:
  title: "Pengalaman"
  items:
    - role: "IT Specialist"
      org: "LHI International Islamic School"
      period: "[GANTI: bulan & tahun mulai] — Sekarang"
      status: "Aktif bekerja — kontrak berjalan"
      summary: "Membangun dan merawat sistem internal sekolah."
      points:
        - "Modul kepegawaian, data akademik, dan penerimaan siswa baru dibangun sebagai bagian terpisah dari satu sistem."
        - "Arsitektur disusun dengan prinsip Domain-Driven Design supaya tetap terbaca saat sistem tumbuh."
        - "Deploy Docker di VPS, dengan rilis otomatis lewat GitHub Actions."
    - role: "Pengembang web — Freelance"
      org: "[GANTI: nama klien, atau tulis Mandiri]"
      period: "[GANTI: periode]"
      status: ""
      summary: "Membangun aplikasi kasir berbasis web."
      points: []
    - role: "[GANTI: posisi magang]"
      org: "Pemerintah Provinsi Jawa Timur"
      period: "[GANTI: periode]"
      status: ""
      summary: "[GANTI: satu kalimat tentang yang dikerjakan di sini]"
      points: []
    - role: "[GANTI: posisi]"
      org: "PT Orbit Ventura Indonesia"
      period: "[GANTI: periode]"
      status: ""
      summary: "Mengerjakan machine learning dan forecasting. Titik awal karier, sebelum berpindah ke pengembangan web."
      points: []

pendidikan:
  title: "Pendidikan"
  items:
    - title: "Sarjana Sistem Informasi"
      org: "Universitas Brawijaya"
      period: "[GANTI: periode]"
      note: "[GANTI: IPK atau catatan lain, hapus baris ini kalau tidak perlu]"
    - title: "Google Project Management Professional Certificate"
      org: "Coursera"
      period: "2026"
      note: "Sertifikat terverifikasi."
      href: "https://www.coursera.org/verify/professional-cert/1N9BWR1AQS1D"

keahlian:
  title: "Keahlian"
  groups:
    - title: "Backend"
      items: ["Laravel", "Filament", "Livewire", "MySQL"]
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
    - title: "Lainnya"
      items:
        ["Tailwind CSS", "Machine learning", "Forecasting", "Manajemen proyek"]

karya:
  title: "Karya"
  intro: "Studi kasus sistem yang saya kerjakan."

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
  text: "Radityo Dwiki Putra Hamas · 2026"
---
