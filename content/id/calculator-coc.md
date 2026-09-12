---
title: "Calculator CoC"
slug: "calculator-coc"
client: "Proyek pribadi"
role: "Pengembang tunggal"
team: "Solo"
period: "Juni 2026 – September 2026"
status: "Live — tersedia untuk umum"
domain: "Perkakas permainan"
stack: ["React", "TypeScript", "Vite", "GitHub Pages"]
summary: "Membuat kalkulator damage Clash of Clans yang menggabungkan Fireball, Giant Arrow, Rocket Backpack, dan Earthquake untuk mencari kombinasi serangan berdasarkan HP bangunan target."
cover: "/images/calculator-coc/01-calculator.png"
featured: false
order: 3
confidential: false
repo: "https://github.com/cleveradit/calculator-coc"
liveUrl: "https://coc.radlabs.my.id"
liveLabel: "Buka Calculator CoC ↗"
metrics: []
---

## Ringkasan

Calculator CoC adalah kalkulator kombinasi damage untuk Clash of Clans. Pengguna memasukkan HP bangunan target, memilih serangan yang tersedia beserta levelnya, lalu aplikasi menghitung apakah kombinasi tersebut cukup untuk menghancurkan bangunan.

Kalkulator ini mendukung Fireball, Giant Arrow, Rocket Backpack, dan Earthquake. Hasilnya diperbarui langsung saat pilihan berubah, lengkap dengan rincian damage, status keberhasilan, dan rekomendasi kombinasi minimum.

![Calculator CoC menampilkan kombinasi Fireball, Giant Arrow, dan Earthquake untuk target dengan 5.800 HP](/images/calculator-coc/01-calculator.png)

## Model perhitungan

Fireball, Giant Arrow, dan Rocket Backpack menghasilkan damage tetap berdasarkan level. Nilainya disimpan sebagai data terpisah untuk setiap jenis serangan, sehingga pembaruan balance dapat dilakukan tanpa mengubah logika utama kalkulator.

Earthquake membutuhkan pendekatan berbeda karena damagenya dihitung dari persentase HP maksimum bangunan dan berkurang pada penggunaan berikutnya. Kalkulator menerapkan pola *diminishing returns*: penggunaan pertama memberikan persentase penuh, penggunaan kedua sepertiganya, penggunaan ketiga seperlimanya, dan seterusnya.

Setelah menjumlahkan seluruh damage tetap, aplikasi mencari jumlah Earthquake paling sedikit yang dapat menutup sisa HP target. Jika damage tetap sudah cukup, Earthquake ditandai tidak diperlukan. Jika kombinasi yang dipilih tetap tidak mencukupi, hasilnya ditampilkan sebagai kondisi gagal.

## Alur penggunaan

Pengguna memulai dari satu input HP bangunan. Setiap kartu serangan dapat diaktifkan atau dimatikan, sedangkan tombol level menyesuaikan damage berdasarkan data level yang tersedia.

Panel hasil kemudian menampilkan:

- status apakah bangunan dapat dihancurkan;
- perbandingan total damage dengan HP target;
- rincian kontribusi tiap serangan;
- jumlah minimum Earthquake yang diperlukan;
- rekomendasi kombinasi dan nilai damage berlebih.

Semua perhitungan berlangsung di browser. Tidak ada akun, penyimpanan data pengguna, atau layanan backend yang diperlukan.

## Pemeliharaan data

Data damage ditempatkan dalam berkas terpisah untuk Fireball, Giant Arrow, Rocket Backpack, dan Earthquake. Struktur ini membuat perubahan angka akibat pembaruan permainan tetap terlokalisasi. Riwayat pengembangan mencatat pembaruan damage Rocket Backpack pada Agustus 2026 tanpa perlu mengubah alur antarmuka atau rumus lainnya.

## Rilis

Aplikasi dibangun sebagai situs statis dengan React, TypeScript, dan Vite. Proses build dan deploy dijalankan melalui GitHub Actions, kemudian hasilnya dipublikasikan di GitHub Pages dan tersedia di [coc.radlabs.my.id](https://coc.radlabs.my.id).
