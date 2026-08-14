---
# Teks landing page. SEMUA teks yang tampil di halaman dibaca dari sini.
#
# Bertanda [GANTI: ...] = fakta yang belum saya punya. Dirender apa adanya,
# jangan dihapus dan jangan ditebak isi sendiri lalu tandanya hilang.
#
# Nada: netral dan ringkas. Halaman ini memperkenalkan orang, bukan
# menawarkan jasa. Hindari klausa pembanding ("bukan X"), superlatif,
# dan janji hasil.

meta:
  siteName: "radlabs"
  siteNameExpansion: "radityo laboratorium"
  url: "https://radlabs.my.id"
  description: "Radityo Dwiki Putra Hamas IT Specialist di LHI International Islamic School, Surabaya. Sistem internal sekolah: kepegawaian, data akademik, dan penerimaan siswa baru. Laravel, Filament, Docker."

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
  lede: "Web Developer · IT Specialist | Google-Certified Project Manager | Laravel · PHP · Docker · Agile"
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
    - "Berlatar Sistem Informasi, dengan pengalaman langsung di pengembangan web full-stack dan manajemen proyek. Sekarang IT Specialist di LHI International Islamic School, memimpin pengembangan beberapa sistem informasi internal sekolah: kepegawaian (HRIS), data akademik, dan penerimaan siswa baru (PPDB) dibangun dengan Laravel, Filament, Docker, dan GitHub Actions."
    - "Telah menyelesaikan Google Project Management Professional Certificate, program enam kursus yang mencakup inisiasi proyek, perencanaan, eksekusi, manajemen risiko, komunikasi dengan pemangku kepentingan, serta metodologi Agile dan Scrum."
    - "Dua latar itu membuat saya terbiasa berpindah antara eksekusi teknis dan koordinasi proyek: membaca kodenya, sekaligus melihat gambaran besarnya proyek selesai tepat waktu, sesuai ruang lingkup, dan dengan hasil yang jelas."

pengalaman:
  title: "Pengalaman"
  items:
    - role: "IT Specialist"
      org: "LHI International Islamic School"
      period: "Januari 2026 - Sekarang"
      summary: "Membangun dan merawat sistem internal sekolah."
      points:
        - "Modul kepegawaian, data akademik, dan penerimaan siswa baru dibangun sebagai bagian terpisah dari satu sistem."
        - "Arsitektur disusun dengan prinsip Domain-Driven Design supaya tetap terbaca saat sistem tumbuh."
        - "Deploy Docker di VPS, dengan rilis otomatis lewat GitHub Actions."
    - role: "Pengembang web - Freelance"
      org: "Bumi Lestari Perkasa"
      period: "September 2023 - November 2023"
      status: ""
      summary: "Membangun aplikasi kasir berbasis web."
      points: 
        - "Menganalisis kebutuhan pengguna dan merancang sistem untuk manajemen data serta kontrol keuangan."
        - "Berkomunikasi dengan stakeholder guna memastikan aplikasi sesuai dengan kebutuhan bisnis."
        - "Mengembangkan dan mengimplementasikan website menggunakan PHP, JavaScript, dan framework CodeIgniter."
        - "Berhasil menyelesaikan dan menerapkan sistem yang digunakan untuk operasional bisnis."
    - role: "Magang"
      org: "Pemerintah Provinsi Jawa Timur"
      period: "Januari 2023 - Februari 2023"
      status: ""
      summary: "Mengembangkan website serta mengelola dan merekapitulasi data aset Pemerintah Provinsi Jawa Timur."
      points: 
        - "Mengembangkan dan memelihara website untuk mendukung operasional instansi."
        - "Mendata dan mencatat informasi aset yang dimiliki oleh Pemerintah Provinsi Jawa Timur."
        - "Melakukan rekapitulasi data aset untuk memastikan kelengkapan dan keteraturan administrasi."
        - "Meningkatkan keterampilan pemrograman web serta pencatatan dan pengelolaan data dalam lingkungan pemerintahan."
    - role: "Peserta Studi Independen Kampus Merdeka"
      org: "PT Orbit Ventura Indonesia"
      period: "Februari 2022 - Juli 2022"
      status: ""
      summary: "Mempelajari machine learning model, deep learning, dan membuat proyek akhir berupa forecasting"
      points: []

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
  text: "radlabs · 2026"
---
