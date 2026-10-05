---
title: "LLM Lokal sebagai Otak AI Agent di PC Tanpa GPU Diskrit"
slug: "llm-lokal-ai-agent"
client: "Proyek pribadi"
role: "Perancang dan pelaksana eksperimen"
team: "Solo, dikerjakan bersama Claude Code sebagai asisten"
period: "Oktober 2026 – sekarang"
status: "Eksperimen berjalan. Server sudah berfungsi dan sudah diuji dengan Codex CLI"
domain: "Infrastruktur AI lokal"
stack: ["llama.cpp (Vulkan)", "Qwen3-Coder-30B-A3B (GGUF Q4)", "CachyOS", "systemd", "ufw", "Codex CLI"]
summary: "Menjalankan model coding 30B di PC rumahan yang hanya punya iGPU, lalu menyambungkannya ke harness AI agent. Tujuannya: agent bisa bekerja tanpa mengirim kode ke layanan cloud."
featured: false
order: 4
confidential: false
repo: null
metrics:
  - label: "Waktu muat model"
    value: "5:55 → 11 detik"
  - label: "Generate, konteks pendek"
    value: "24,7 token/s"
  - label: "Pertanyaan lanjutan, prompt cache"
    value: "0,5 detik"
  - label: "Bandwidth RAM"
    value: "60,6 GB/s"
---

## Ringkasan

Saya ingin tahu seberapa jauh AI agent bisa berjalan di perangkat sendiri. Hasilnya, satu PC berisi Ryzen 7 8700G dengan RAM 32 GB, tanpa kartu grafis terpisah, sekarang bisa melayani model Qwen3-Coder-30B-A3B lewat API yang kompatibel dengan OpenAI. Server dinyalakan hanya saat dibutuhkan (`llm start`), siap dalam sekitar 10 detik, dan bisa dipakai oleh harness agent di PC yang sama maupun PC lain di jaringan lokal.

## Memilih Model dari Batasan, Bukan dari Leaderboard

Saya tidak mulai dengan pertanyaan "model apa yang paling pintar?". Pertanyaan pertama saya: "apa yang membatasi kecepatan di mesin ini?". Jawabannya bisa diukur, yaitu **bandwidth RAM**. Benchmark baca multithread menghasilkan 60,6 GB/s. Angka ini sekaligus memastikan RAM sudah berjalan dual channel, karena single channel hanya mencapai sekitar 30 GB/s.

Dari batasan itu, keputusannya jadi jelas:

- **Model dense 30B ke atas tidak layak.** Setiap token harus membaca seluruh bobot model dari RAM, sehingga kecepatannya hanya beberapa token per detik.
- **Model MoE (Mixture of Experts) paling masuk akal.** Qwen3-Coder-30B-A3B punya 30 miliar parameter, tetapi hanya sekitar 3,3 miliar yang aktif per token. Kualitasnya mendekati model besar, kecepatannya mendekati model kecil.
- **Model ini dilatih untuk agentic coding**, sehingga tool calling-nya lebih bisa diandalkan dibanding model chat umum.
- **Kelas di atasnya tidak muat.** Model seperti GLM-4.5-Air atau gpt-oss-120b butuh lebih dari 45 GB RAM.

## Membuat iGPU Bisa Memuat Model 20 GB

Model dan konteks 64k token butuh sekitar 20,5 GB memori grafis. Secara default, kernel Linux hanya mengizinkan iGPU meminjam setengah RAM (15,2 GB) lewat mekanisme GTT. Saya menaikkan batas itu menjadi 24 GB lewat parameter kernel:

```
ttm.pages_limit=6291456 ttm.page_pool_size=6291456 amdgpu.gttsize=24576
```

Saya sengaja memilih GTT daripada menaikkan VRAM di BIOS. VRAM BIOS memotong RAM secara permanen, sedangkan GTT hanya berupa batas atas: saat LLM mati, RAM tersebut kembali bisa dipakai aplikasi lain.

## Server yang Menyala Hanya Saat Dibutuhkan

Versi pertama saya pasang sebagai service sistem yang otomatis jalan saat boot. Ternyata ini keputusan yang salah. Setiap kali PC dinyalakan, model 17,7 GB langsung dimuat, sehingga desktop terasa berat di menit-menit awal.

Versi akhirnya memakai **user service systemd tanpa bagian `[Install]`**, sehingga service ini memang tidak bisa ikut jalan saat boot. Untuk mengontrolnya, saya membuat satu perintah sederhana:

| Perintah | Fungsi |
|---|---|
| `llm start` | Menyalakan server dan menunggu sampai model siap |
| `llm stop` | Mematikan server dan membebaskan sekitar 21 GB RAM |
| `llm status` | Status, endpoint, dan pemakaian memori iGPU |
| `llm key` | Menampilkan API key untuk dipasang di harness |

Akses dari jaringan dibatasi dua lapis: API key wajib (request tanpa key ditolak dengan HTTP 401), dan firewall hanya membuka port untuk subnet lokal.

## Temuan yang Tidak Saya Cari: SSD yang Melambat

Pada percobaan pertama, model butuh **5 menit 55 detik** untuk dimuat. Mengganti mode pemuatan llama.cpp tidak membantu, bahkan salah satunya membuat waktu muat naik menjadi 7 menit 24 detik. Jadi saya berhenti mengutak-atik software dan mulai mengukur hardware:

| Data yang dibaca | Kecepatan |
|---|---|
| File model, sekitar 1 jam setelah diunduh | 42–50 MB/s |
| Data lama, dibaca langsung dari device | 23–32 MB/s |
| File yang baru saja ditulis | 4,2 GB/s |

SSD NVMe ini membaca data yang sudah "mengendap" sekitar 100 kali lebih lambat daripada data baru. Gejala ini dikenal sebagai *stale-data read degradation*. Kondisi SMART-nya normal, jadi masalah ini tidak akan terlihat kalau saya hanya mengecek kesehatan disk. Setelah file model ditulis ulang ke blok baru, waktu muat turun dari **5 menit 55 detik menjadi 11 detik**. Prosedur ini sekarang tersedia sebagai `llm refresh`.

Pelajaran terbesar dari eksperimen ini justru datang dari sini: ukur dulu di lapisan paling bawah sebelum menyalahkan lapisan yang paling terlihat.

## Hasil Terukur

**Benchmark terkontrol** (request langsung ke server):

| Uji | Hasil |
|---|---|
| Kecepatan generate, konteks pendek | 24,7 token/s |
| Kecepatan generate, konteks sekitar 14,5k token | 16,5 token/s |
| Pemrosesan prompt sekitar 14,5k token | 229 token/s (63 detik) |
| Pertanyaan lanjutan dengan prompt cache | 0,5 detik |
| Tool calling | Berhasil, dengan argumen JSON yang valid |

**Pemakaian nyata dengan Codex CLI** (dari log server):

| Uji | Hasil |
|---|---|
| Pemrosesan prompt | 660 token baru dalam 10,7 detik (61 token/s) |
| Kecepatan generate | 1.054 token dalam 104 detik (10,1 token/s) |

Angka dari Codex lebih rendah daripada benchmark, dan itu wajar. Agent membawa riwayat percakapan dan konteks project yang panjang. Semakin panjang konteks, semakin lambat setiap token dihasilkan. Bagian prompt yang baru juga diproses dalam potongan kecil, dan potongan kecil kurang efisien dibanding satu prompt besar.

## Menyambungkan ke Codex

Codex versi 0.159 hanya menerima provider dengan format Responses API (`wire_api = "responses"`). Format ini ternyata sudah didukung llama.cpp. Saya mendaftarkan server lokal sebagai provider tambahan dan membuat perintah terpisah, `codex-lokal`. Dengan begitu, `codex` biasa tetap memakai model cloud, sementara `codex-lokal` menyalakan server lokal (kalau belum jalan) dan memakainya.

Codex memberi peringatan bahwa metadata model `qwen3-coder-30b` tidak dikenal, sehingga memakai pengaturan fallback. Context window sudah saya tetapkan sendiri. Kecocokan format tool dan instruksi sistem untuk model non-OpenAI masih perlu diamati lebih lanjut.

## Pelajaran

1. **Mulai dari batasan yang bisa diukur.** Bandwidth RAM menentukan pilihan model lebih tegas daripada skor benchmark mana pun.
2. **Autostart bukan pilihan default yang netral.** Untuk proses yang memakai 21 GB RAM, menyala hanya saat dibutuhkan jauh lebih masuk akal.
3. **Gejala di aplikasi belum tentu masalah di aplikasi.** Loading model yang lambat ternyata berasal dari SSD, dan itu baru ketahuan setelah diukur di level device.
4. **LLM lokal di iGPU bisa dipakai untuk agent, dengan ekspektasi yang jujur.** Hasilnya cukup untuk tugas-tugas kecil dan data yang sensitif, tetapi belum menggantikan model cloud untuk pekerjaan panjang dan kompleks.

