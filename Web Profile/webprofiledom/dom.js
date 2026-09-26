/* =====================================================================
   SISTEM NAVIGASI SINGLE PAGE APPLICATION (SPA)
   Tujuan: Berpindah halaman tanpa memuat ulang (reload) peramban.
===================================================================== */

// 1. Memilih semua elemen tautan navigasi dan semua bagian halaman (section)
const tautanNavigasi = document.querySelectorAll('#menu-navigasi a');
const semuaHalaman = document.querySelectorAll('.halaman');

// 2. Memberikan kejadian 'click' pada setiap tautan di menu
tautanNavigasi.forEach(function(tautan) {
    tautan.addEventListener('click', function(event) {
        // Mencegah peramban melompat ke bagian atas halaman secara default
        event.preventDefault(); 

        // 3. Mengambil nilai atribut 'data-target' dari tautan yang diklik
        const targetId = this.getAttribute('data-target');

        // 4. Menyembunyikan semua halaman dengan menambahkan kelas CSS '.sembunyi'
        semuaHalaman.forEach(function(halaman) {
            halaman.classList.add('sembunyi');
            halaman.classList.remove('aktif');
        });

        // 5. Menghapus status '.aktif' dari semua tautan di menu
        tautanNavigasi.forEach(function(t) {
            t.classList.remove('aktif');
        });

        // 6. Menampilkan halaman yang dituju dan menandai tautan yang aktif
        document.getElementById(targetId).classList.remove('sembunyi');
        document.getElementById(targetId).classList.add('aktif');
        this.classList.add('aktif'); // 'this' merujuk pada tautan yang sedang diklik
    });
});


/* =====================================================================
   SLIDE GALERI FOTO (CAROUSEL) PADA HALAMAN BERANDA
   Tujuan: Menggeser indeks gambar secara dinamis dengan DOM ClassList.
===================================================================== */

const semuaSlide = document.querySelectorAll('.slide');
const tombolSebelumnya = document.getElementById('tombol-sebelumnya');
const tombolSelanjutnya = document.getElementById('tombol-selanjutnya');
let indeksSlideSaatIni = 0; // Variabel untuk menyimpan posisi gambar saat ini

// Fungsi pembantu untuk memanipulasi DOM menampilkan gambar berdasarkan indeks
function tampilkanSlide(indeks) {
    // Sembunyikan semua gambar terlebih dahulu
    semuaSlide.forEach(function(slide) {
        slide.classList.remove('aktif');
    });
    // Tampilkan hanya gambar pada indeks yang dituju
    semuaSlide[indeks].classList.add('aktif');
}

tombolSelanjutnya.addEventListener('click', function() {
    indeksSlideSaatIni++;
    // Jika indeks melebihi jumlah gambar, kembali ke awal (0)
    if (indeksSlideSaatIni >= semuaSlide.length) {
        indeksSlideSaatIni = 0; 
    }
    tampilkanSlide(indeksSlideSaatIni);
});

tombolSebelumnya.addEventListener('click', function() {
    indeksSlideSaatIni--;
    // Jika indeks kurang dari 0, pergi ke gambar paling akhir
    if (indeksSlideSaatIni < 0) {
        indeksSlideSaatIni = semuaSlide.length - 1; 
    }
    tampilkanSlide(indeksSlideSaatIni);
});


/* =====================================================================
   MENAMBAH DAN MENGHAPUS ELEMEN PORTOFOLIO (CREATE & DELETE NODES)
   Tujuan: Memahami cara membuat struktur HTML baru melalui JavaScript.
===================================================================== */

const tombolTambahProyek = document.getElementById('tombol-tambah-proyek');
const inputJudulProyek = document.getElementById('input-judul-proyek');
const inputDeskripsiProyek = document.getElementById('input-deskripsi-proyek');
const galeriPortofolio = document.getElementById('galeri-portofolio');

// A. Fungsi Menambah Proyek Baru
tombolTambahProyek.addEventListener('click', function() {
    const judul = inputJudulProyek.value.trim();
    const deskripsi = inputDeskripsiProyek.value.trim();

    // Validasi sederhana memastikan input tidak kosong
    if (judul === '' || deskripsi === '') {
        alert('Judul dan Deskripsi proyek tidak boleh kosong!');
        return; // Menghentikan fungsi jika kosong
    }

    // 1. Membuat Elemen HTML baru di memori
    const kartuBaru = document.createElement('div');
    kartuBaru.classList.add('kartu-portofolio'); // Menambahkan kelas CSS

    const elemenJudul = document.createElement('h3');
    elemenJudul.textContent = judul; // Mengisi teks

    const elemenDeskripsi = document.createElement('p');
    elemenDeskripsi.textContent = deskripsi;

    const tombolHapusBaru = document.createElement('button');
    tombolHapusBaru.classList.add('tombol-hapus');
    tombolHapusBaru.textContent = 'Hapus Proyek';

    // 2. Merangkai elemen-elemen ke dalam kartu (Menyusun Tree)
    kartuBaru.appendChild(elemenJudul);
    kartuBaru.appendChild(elemenDeskripsi);
    kartuBaru.appendChild(tombolHapusBaru);

    // 3. Memasukkan kartu yang sudah jadi ke dalam halaman (DOM Dokumen)
    galeriPortofolio.appendChild(kartuBaru);

    // Mengosongkan form input kembali
    inputJudulProyek.value = '';
    inputDeskripsiProyek.value = '';
});

// B. Fungsi Menghapus Proyek (Event Delegation)
// Karena tombol hapus bisa bertambah secara dinamis, kita menaruh pendengar (listener) 
// pada elemen induk (galeriPortofolio), lalu mengecek apa yang diklik.
galeriPortofolio.addEventListener('click', function(event) {
    // Mengecek apakah elemen yang diklik mengandung kelas 'tombol-hapus'
    if (event.target.classList.contains('tombol-hapus')) {
        // Traversal DOM: Mencari elemen induk dari tombol tersebut (yaitu div.kartu-portofolio)
        const kartuYangAkanDihapus = event.target.parentElement;
        
        // Memusnahkan elemen tersebut dari DOM
        kartuYangAkanDihapus.remove();
    }
});


/* =====================================================================
   VALIDASI FORMULIR (REGISTRASI & PEMESANAN) DENGAN DOM
   Tujuan: Mencegah pengiriman data jika format tidak sesuai.
===================================================================== */

// Fungsi Helper (Fungsi Bantuan) untuk mengatur pesan galat
function aturGalat(elemenInput, pesan) {
    elemenInput.classList.add('galat');
    // nextElementSibling merujuk pada tag <small> yang berada tepat di bawah input
    elemenInput.nextElementSibling.textContent = pesan;
}

function hapusGalat(elemenInput) {
    elemenInput.classList.remove('galat');
    elemenInput.nextElementSibling.textContent = '';
}

// 1. Validasi Form Registrasi
const formRegistrasi = document.getElementById('form-registrasi');
formRegistrasi.addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form memuat ulang halaman

    const nama = document.getElementById('reg-nama');
    const email = document.getElementById('reg-email');
    const password = document.getElementById('reg-password');
    let valid = true;

    hapusGalat(nama); hapusGalat(email); hapusGalat(password);

    if (nama.value.trim() === '') { aturGalat(nama, 'Nama harus diisi'); valid = false; }
    if (email.value.trim() === '') { aturGalat(email, 'Email harus diisi'); valid = false; }
    if (password.value.trim().length < 6) { aturGalat(password, 'Sandi minimal 6 karakter'); valid = false; }

    if (valid) {
        // Menyembunyikan input form dan menampilkan pesan sukses
        formRegistrasi.querySelectorAll('.grup-input, button').forEach(el => el.classList.add('sembunyi'));
        document.getElementById('pesan-sukses-reg').classList.remove('sembunyi');
    }
});

// 2. Validasi Form Pemesanan
const formPemesanan = document.getElementById('form-pemesanan');
formPemesanan.addEventListener('submit', function(event) {
    event.preventDefault();

    const klien = document.getElementById('pesan-klien');
    const layanan = document.getElementById('pesan-layanan');
    const detail = document.getElementById('pesan-detail');
    let valid = true;

    hapusGalat(klien); hapusGalat(layanan); hapusGalat(detail);

    if (klien.value.trim() === '') { aturGalat(klien, 'Nama Klien harus diisi'); valid = false; }
    if (layanan.value === '') { aturGalat(layanan, 'Silakan pilih satu jenis layanan'); valid = false; }
    if (detail.value.trim() === '') { aturGalat(detail, 'Detail kebutuhan harus dijelaskan'); valid = false; }

    if (valid) {
        formPemesanan.querySelectorAll('.grup-input, button').forEach(el => el.classList.add('sembunyi'));
        document.getElementById('pesan-sukses-pesan').classList.remove('sembunyi');
    }
});