const namaPemilik = "Derriel Mulya Ramadhan";
const prodi = "Sistem Informasi";
let totalKunjungan = 1; 

console.log("=== DATA PROFIL (CONSOLE INSPECTION) ===");
console.log("Pemilik Web : " + namaPemilik);
console.log("Program Studi : " + prodi);
console.log("Kunjungan ke : " + totalKunjungan);

function dapatkanSalam(jam) {
    if (jam >= 4 && jam < 11) {
        return "Selamat Pagi";
    } else if (jam >= 11 && jam < 15) {
        return "Selamat Siang";
    } else if (jam >= 15 && jam < 18) {
        return "Selamat Sore";
    } else {
        return "Selamat Malam";
    }
}

function formatWaktuLengkap() {
    const sekarang = new Date();
    const jam = String(sekarang.getHours()).padStart(2, "0");
    const menit = String(sekarang.getMinutes()).padStart(2, "0");
    return jam + ":" + menit + " WIB";
}

const elemenSalam = document.getElementById("pesan-salam");
const elemenWaktu = document.getElementById("info-waktu");

if (elemenSalam && elemenWaktu) {
    const jamSekarang = new Date().getHours();
    elemenSalam.textContent = dapatkanSalam(jamSekarang);
    elemenWaktu.textContent = "Halaman dimuat pukul " + formatWaktuLengkap();
}

const tombolTema = document.getElementById("tombol-tema");
const bodyHalaman = document.body;

if (tombolTema) {
    tombolTema.addEventListener("click", function () {

        const isDark = bodyHalaman.classList.toggle("mode-gelap");

        if (isDark) {
            tombolTema.textContent = "Mode Terang";
        } else {
            tombolTema.textContent = "Mode Gelap";
        }
    });
}


const daftarGambarGaleri = document.querySelectorAll(".gallery img");

for (let i = 0; i < daftarGambarGaleri.length; i++) {
    daftarGambarGaleri[i].addEventListener("click", function () {
        const altTeks = this.getAttribute("alt") || "Karya seni";
        alert("Karya: " + altTeks + "\nKoleksi 'Nocturnal Echoes'");
    });
}

const daftarMinat = ["Graphic Design", "Motion Graphics", "Data Analysis", "Pengembangan Sistem Informasi"];
console.log("=== DAFTAR MINAT MAHASISWA ===");
for (let i = 0; i < daftarMinat.length; i++) {
    console.log((i + 1) + ". " + daftarMinat[i]);
}