# CHILL Movie App (v4)

CHILL adalah aplikasi web streaming film modern yang dibuat dengan React. Proyek ini menampilkan antarmuka yang bersih untuk menjelajahi, menambah, dan mengelola daftar film, lengkap dengan sistem autentikasi pengguna.

![Homepage Screenshot](https://i.imgur.com/LgJQYnU.png)

## ✨ Fitur Utama

-   **Autentikasi Pengguna:** Sistem registrasi dan login yang aman menggunakan hashing password di sisi klien.
-   **Routing Terproteksi:** Pengguna tidak dapat mengakses halaman utama tanpa login, dan tidak dapat mengakses halaman login jika sudah masuk.
-   **Manajemen Film (CRUD):**
    -   **Create:** Menambahkan film baru melalui modal interaktif.
    -   **Read:** Menampilkan daftar film yang diambil dari API dan disaring berdasarkan kategori (Top, New, Trending).
    -   **Update:** Mengedit detail film yang ada melalui modal.
    -   **Delete:** Menghapus film dari database.
-   **State Management Terpusat:** Menggunakan Zustand untuk mengelola state global seperti status autentikasi, data film, dan status modal.
-   **Desain Responsif:** Antarmuka yang beradaptasi dengan baik di perangkat seluler dan desktop menggunakan Tailwind CSS.
-   **Konfigurasi API Terpusat:** Menggunakan Axios Interceptors untuk melampirkan token autentikasi secara otomatis ke setiap permintaan API.

## 🛠️ Teknologi yang Digunakan

-   **Frontend:** [React](https://reactjs.org/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Routing:** [React Router](https://reactrouter.com/)
-   **State Management:** [Redux](https://github.com/reduxjs/redux-toolkit)
-   **HTTP Client:** [Axios](https://axios-http.com/)
-   **Password Hashing:** [bcryptjs](https://github.com/dcodeIO/bcrypt.js)

## 🚀 Instalasi dan Penggunaan

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

### Prasyarat

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) (disarankan versi LTS) dan npm/yarn.

### Langkah-langkah

1.  **Clone repositori ini:**
    ```bash
    git clone [https://github.com/nama-anda/nama-repo.git](https://github.com/nama-anda/nama-repo.git)
    cd nama-repo
    ```

2.  **Instal dependensi:**
    ```bash
    npm install
    ```

3.  **Siapkan Environment Variable:**
    Buat file `.env` di direktori utama proyek dan tambahkan URL dasar untuk mock API Anda.
    ```env
    VITE_API_BASE_URL=[https://url-mockapi-anda.mockapi.io/api/v1](https://url-mockapi-anda.mockapi.io/api/v1)
    ```

4.  **Jalankan server development:**
    ```bash
    npm run dev
    ```
    Aplikasi sekarang akan berjalan di `http://localhost:5173`.

## 📂 Struktur Proyek

Struktur folder proyek ini dirancang agar modular dan mudah dikelola.
