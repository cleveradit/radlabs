---
title: "Alur Kerja Terdokumentasi untuk AI Agent"
slug: "workflow-template"
client: "Proyek pribadi, terbuka untuk umum"
role: "Perancang alur kerja"
team: "Solo"
period: "Februari 2026 – sekarang"
status: "Dipakai di seluruh project yang saya kerjakan"
domain: "Perkakas pengembang"
stack: ["Markdown", "Claude Code", "GitHub"]
summary: "Menyusun alur kerja yang melarang AI agent menyentuh kode sebelum rencananya ditulis jadi tiket dan disetujui manusia, dengan konteks project yang ikut ter-commit di git."
featured: false
order: 2
confidential: false
repo: "https://github.com/cleveradit/ai-workflow-template"
metrics: []
---

## Ringkasan

Setiap AI agent yang saya pakai punya kebiasaan yang sama: apa pun yang masuk ke prompt langsung dikerjakan. Termasuk kalimat yang jelas-jelas pertanyaan — diakhiri tanda tanya, tanpa satu pun perintah di dalamnya — tetap dijawab dengan mengubah kode.

Saya menyusun alur kerja untuk menutup kebiasaan itu. Aturan intinya satu kalimat: **agent baru boleh menyentuh kode setelah rencananya ditulis jadi tiket dan tiket itu saya setujui.** Sisanya adalah struktur yang membuat aturan itu bisa ditegakkan, bukan sekadar diimbau.

Alur ini sekarang jadi titik awal setiap project yang saya kerjakan.

## Masalah — pertanyaan dijawab dengan menulis kode

Agent tidak membedakan "tolong kerjakan ini" dari "menurutmu bagaimana kalau begini". Keduanya masuk sebagai instruksi. Saat saya masih menimbang sebuah pendekatan, kodenya sudah berubah.

Ongkosnya dibayar dua kali. Pertama, hasil yang salah harus dibongkar dan dikerjakan ulang. Kedua, pengulangan itu sendiri menghabiskan token — konteks yang sudah panjang dibaca lagi dari awal untuk membatalkan pekerjaan yang tidak pernah saya minta.

Yang membuatnya melelahkan bukan kesalahan tunggalnya, melainkan bahwa saya harus mengawasi terus-menerus. Setiap kalimat yang saya ketik berpotensi jadi perintah, jadi setiap kalimat harus dipikirkan dua kali sebelum dikirim.

Ada masalah kedua yang muncul dari arah berbeda. Saya berpindah-pindah komputer, sementara memory lokal agent tidak ikut ter-commit. Konteks yang dibangun di satu mesin — keputusan yang sudah disepakati, alasan di balik sebuah rancangan, pekerjaan yang tertinggal separuh jalan — tidak tersedia di mesin berikutnya. Diskusi yang sama terulang, dan kadang keputusannya berubah tanpa ada yang menyadari.

## Gerbang persetujuan

Solusinya memindahkan titik persetujuan ke depan: sebelum kode berubah, bukan sesudah.

Setiap pekerjaan lewat tiket rencana yang punya empat status, dan statusnya menentukan apa yang boleh dilakukan agent:

| Status | Artinya | Boleh eksekusi? |
|---|---|---|
| `DRAFT` | Keputusan belum terkunci | Tidak |
| `REVIEW` | Keputusan terkunci, menunggu koreksi saya | Tidak |
| `READY` | Saya sudah menyetujui secara tertulis | Ya |
| `DONE` | Implementasi dan verifikasi selesai | — |

Yang membuat ini bekerja adalah satu batasan pada `READY`: **status itu tidak boleh disetel agent atas penilaiannya sendiri.** Agent menaikkan tiket sampai `REVIEW` lalu berhenti. Yang memindahkannya ke `READY` hanya persetujuan tertulis dari saya di percakapan.

Efeknya bukan sekadar mencegah kode salah. Perdebatan berpindah dari kode ke tiket — dan mengoreksi satu paragraf rencana jauh lebih murah daripada membongkar perubahan yang sudah menyebar ke banyak file.

## Empat langkah

Alurnya punya empat perhentian, masing-masing untuk jenis informasi yang berbeda. Kebanyakan kekacauan dokumentasi terjadi karena keempatnya ditumpuk di satu tempat.

| Yang muncul | Perhentiannya | Bentuknya |
|---|---|---|
| Ide atau bug yang belum tentu dikerjakan | Backlog | Status `READY` atau `BLOCKED` beserta alasan blokirnya. Dihapus dari backlog begitu naik jadi tiket |
| Pekerjaan yang akan dieksekusi | Tiket rencana | Rencana lengkap yang harus saya setujui lebih dulu |
| Fitur yang sudah rilis | Feature doc | Ringkasan, katalog sebagai tabel, dan gotcha yang tidak kelihatan dari kode |
| Alasan di balik sebuah keputusan | Decision log | Empat field tetap: keputusannya, alasannya, dampaknya, tiket terkaitnya |

Pemisahan ini juga menjawab pertanyaan yang dulu sering menggantung: sesuatu yang saya sebut sambil lalu itu masuk ke mana. Kalau belum tentu dikerjakan, ia ide — masuk backlog. Kalau sudah diputuskan, ia tiket. Kalau sudah jalan, ia feature doc. Kalau yang perlu diingat justru alasannya, ia entry keputusan.

## Aturan yang mengikat agent

Tiga aturan menahan alur ini supaya tidak melar kembali jadi kebiasaan lama.

**Konteks wajib ter-commit, bukan disimpan di memory lokal agent.** Semua yang perlu bertahan antar-sesi — keputusan, status tiket, hasil analisis, progres sesi terakhir — ditulis ke berkas yang ikut masuk git. Memory lokal agent tidak boleh dijadikan sumber kebenaran, karena ia tidak ikut ter-commit dan karenanya tidak ada di komputer berikutnya. Ini yang membuat pekerjaan bisa dilanjutkan dari mesin lain: saya membuka project, agent membaca berkasnya, dan konteksnya utuh kembali tanpa saya ceritakan ulang.

**Kontrak teknis di tiket tidak boleh ambigu.** Tiket menyebut path berkas, tanda tangan fungsi, bentuk nilai kembalian, dan titik integrasinya secara persis. Ada dua larangan eksplisit di templatenya: dilarang menulis "atau berkas terkait", dan dilarang melebarkan cakupan tanpa persetujuan baru. Rumusan yang longgar adalah celah paling umum bagi agent untuk mengerjakan sesuatu yang tidak diminta sambil tetap merasa patuh pada tiket.

Tiket juga wajib memuat matriks uji terima dengan minimal satu kasus batas dan satu kasus gagal. Skenario yang berhasil selalu mudah ditulis; yang menentukan hasilnya justru dua kasus itu.

**Keputusan hanya dicatat kalau memenuhi kriteria.** Sebuah keputusan layak masuk decision log bila ia jebakan teknis yang tidak bisa disimpulkan dari membaca kode, trade-off bisnis yang konsekuensinya tidak kelihatan, atau koreksi atas asumsi yang ternyata salah. Perapian kode, perubahan tampilan kecil, dan hal yang sudah tertulis di mandat project tidak dicatat. Entry yang sudah digantikan dihapus, bukan dibiarkan menumpuk.

Kriteria ini ada untuk melindungi catatannya sendiri. Log yang mencatat segalanya berhenti dibaca, dan log yang berhenti dibaca sama saja dengan tidak ada.

## Bentuk alurnya

Semuanya berupa berkas Markdown biasa, tanpa perkakas tambahan dan tanpa ketergantungan pada bahasa atau framework tertentu.

| Berkas | Perannya |
|---|---|
| Berkas konteks utama | Titik masuk yang dibaca agent tiap sesi baru; menarik mandat project dan menaut ke pekerjaan yang sedang berjalan |
| Mandat & aturan | Tech stack, batas arsitektur, aturan teknis, dan cara menjalankan project di lokal. Empat bagian ini diisi ulang tiap project; bagian alur kerjanya tetap sama |
| Backlog | Ide dan bug yang belum berstatus tiket |
| Indeks rencana | Urutan eksekusi tiket aktif beserta ketergantungannya |
| Template tiket | Delapan bagian tetap, dari keputusan bisnis sampai daftar hal yang justru dinyatakan di luar cakupan |
| Catatan sesi | Tiket aktif, progres, penghambat, dan langkah berikutnya |
| Indeks fitur | Daftar feature doc beserta konvensi penulisannya |
| Decision log | Keputusan teknis dan trade-off yang tidak bisa dibaca dari kode |

Tiket yang selesai tidak dihapus. Ia dipindah ke folder arsip dan entrinya dicabut dari indeks, sehingga indeks hanya memuat pekerjaan yang benar-benar berjalan. Penomoran tiket baru dicek ke arsip lebih dulu supaya nomornya tidak bertabrakan dengan tiket lama.

Bagian mandat sengaja dipisah jadi dua lapis. Empat bagian atas — tech stack, batas arsitektur, aturan teknis, dan lingkungan pengembangan — berbeda di tiap project dan diisi saat inisiasi. Bagian alur kerjanya tidak diisi ulang: ia bagian yang justru harus sama di mana-mana, karena kalau tiap project punya versi aturannya sendiri, tidak ada satu pun yang benar-benar mengikat.
