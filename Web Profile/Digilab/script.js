// Memastikan seluruh dokumen (DOM) selesai dimuat
$(document).ready(function() {

    /* FITUR 1: MENAMBAH BUKU BARU (CREATE) */
    $("#form-tambah-buku").on("submit", function(event) {
        event.preventDefault();

        // 1. Mengambil nilai input dan membersihkan spasi awal/akhir (.trim)
        let judulBuku = $("#input-judul").val().trim();
        let penulisBuku = $("#input-penulis").val().trim();

        if (judulBuku !== "" && penulisBuku !== "") {
            // 2. Merangkai elemen HTML kartu buku
            let elemenBukuBaru = `
                <div class="kartu-buku" style="display: none;">
                    <h4 class="judul-buku"></h4>
                    <p class="penulis-buku"></p>
                    <button class="hapus-buku">Hapus</button>
                </div>
            `;

            let $kartu = $(elemenBukuBaru);$kartu.find(".judul-buku").text(judulBuku);
            $kartu.find(".penulis-buku").text("Penulis: " + penulisBuku);

            // 3. Menyisipkan ke rak dan memunculkannya dengan animasi fadeIn
            $("#rak-buku").append($kartu);$kartu.fadeIn(800);

            // 4. Mengosongkan kembali kolom input
            $("#input-judul").val("");
            $("#input-penulis").val("");

            // 5. Menampilkan pesan notifikasi
            $("#pesan-notifikasi")
                .text("Buku berhasil ditambahkan ke rak!")
                .addClass("sukses")
                .slideDown("fast")
                .delay(3000)
                .slideUp("fast");
        }
    });

    /* FITUR 2: MENGHAPUS BUKU DENGAN DELEGASI (DELETE) */
    $("#rak-buku").on("click", ".hapus-buku", function() {
        let konfirmasi = confirm("Apakah Anda yakin ingin menghapus buku ini dari rak?");
        
        if (konfirmasi) {
            // .closest mencari elemen .kartu-buku terdekat
            $(this).closest(".kartu-buku").fadeOut(500, function() {
                $(this).remove();
            });
        }
    });

    /* FITUR 3: PENCARIAN BUKU REAL-TIME (FILTERING) */
    $("#cari-buku").on("keyup", function() {
        let kataKunci = $(this).val().toLowerCase();

        $(".kartu-buku").filter(function() {
            let cocok = $(this).text().toLowerCase().indexOf(kataKunci) > -1;
            $(this).toggle(cocok);
        });
    });

});