// Memastikan semua elemen web (DOM) siap dimanipulasi
$(document).ready(function() {

    /* ====================================================================
       1. EFEK GULIR (SCROLL EVENT) PADA BILAH NAVIGASI
       Tujuan: Mengubah navbar transparan menjadi solid saat digulir ke bawah.
    ==================================================================== */
    $(window).scroll(function() {
        // Jika jarak gulir dari atas melebihi 50 piksel
        if ($(this).scrollTop() > 50) {
            // Hapus kelas transparan, tambahkan kelas navbar-scrolled (didefinisikan di CSS)
            $("#navbarUtama").removeClass("transparan-awal").addClass("navbar-scrolled");
        } else {
            // Jika kembali ke puncak, kembalikan ke kondisi semula
            $("#navbarUtama").removeClass("navbar-scrolled").addClass("transparan-awal");
        }
    });

    /* ====================================================================
       2. FITUR FILTER GALERI PORTOFOLIO
       Tujuan: Menyembunyikan/menampilkan kartu berdasarkan kategori.
    ==================================================================== */
    $(".btn-filter").click(function() {
        // Mengubah tampilan tombol aktif
        $(".btn-filter").removeClass("aktif btn-primary").addClass("btn-outline-primary");
        $(this).removeClass("btn-outline-primary").addClass("aktif btn-primary");

        // Mengambil nilai filter dari atribut data-filter tombol yang diklik
        let nilaiFilter = $(this).attr("data-filter");

        // Proses penyaringan (Filtering) dengan efek memudar (fadeOut / fadeIn)
        if (nilaiFilter === "semua") {
            // Tampilkan semua jika pengguna memilih kategori "Semua"
            $(".item-portofolio").show(400); // 400 adalah kecepatan animasi dalam ms
        } else {
            // Sembunyikan (.hide) semua item portofolio
            $(".item-portofolio").hide();
            // Kemudian hanya cari (.filter) dan tampilkan (.show) yang cocok
            $(".item-portofolio").filter("[data-kategori='" + nilaiFilter + "']").show(400);
        }
    });

    /* ====================================================================
       3. VALIDASI FORMULIR KONTAK DI SISI KLIEN (CLIENT-SIDE)
       Tujuan: Mengecek apakah nama dan email sudah diisi dengan benar.
    ==================================================================== */
    $("#form-kontak").submit(function(event) {
        event.preventDefault(); // Mencegah reload halaman secara bawaan

        let nama = $("#input-nama").val().trim();
        let email = $("#input-email").val().trim();
        let valid = true;

        // Membersihkan status galat sebelumnya (Menghapus kelas "is-invalid" bawaan Bootstrap)
        $(".form-control").removeClass("is-invalid");
        $("#pesan-sukses").hide();

        // Validasi Nama (Tidak boleh kosong)
        if (nama === "") {
            $("#input-nama").addClass("is-invalid"); // is-invalid adalah kelas Bootstrap untuk border merah
            valid = false;
        }

        // Validasi Email (Tidak boleh kosong dan harus mengandung karakter '@')
        if (email === "" || email.indexOf("@") === -1) {
            $("#input-email").addClass("is-invalid");
            valid = false;
        }

        // Jika semua validasi lolos (bernilai true)
        if (valid) {
            // 1. Munculkan pesan sukses (Alert hijau) dengan animasi slideDown
            $("#pesan-sukses").slideDown();
            
            // 2. Kosongkan kembali form (reset)
            // Karena fungsi reset() bukan milik jQuery, kita memanggil elemen murni DOM melalui array [0]
            $("#form-kontak")[0].reset();
            
            // 3. Menghilangkan pesan sukses setelah 4 detik secara otomatis
            setTimeout(function() {
                $("#pesan-sukses").slideUp();
            }, 4000);
        }
    });

});