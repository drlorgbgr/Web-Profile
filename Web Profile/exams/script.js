function hitungDiskon() {
  const harga = parseFloat(document.getElementById('harga').value) || 0;
  const diskon = parseFloat(document.getElementById('diskon').value) || 0;
  
  const potongan = harga * (diskon / 100);
  const totalAkhir = harga - potongan;

  document.getElementById('hasilKalkulator').innerText = 
    'Total: Rp ' + totalAkhir.toLocaleString('id-ID');
}

function tambahTugas() {
  const input = document.getElementById('inputTugas');
  const teksTugas = input.value.trim();

  if (teksTugas === '') return;

  const li = document.createElement('li');
  li.innerHTML = `
    <span>${teksTugas}</span>
    <button class="btn-hapus" onclick="hapusTugas(this)">Hapus</button>
  `;

  document.getElementById('daftarTugas').appendChild(li);
  input.value = '';
}

function hapusTugas(buttonElement) {
  buttonElement.parentElement.remove();
}

function perbaruiJam() {
  const sekarang = new Date();
  const jam = String(sekarang.getHours()).padStart(2, '0');
  const menit = String(sekarang.getMinutes()).padStart(2, '0');
  const detik = String(sekarang.getSeconds()).padStart(2, '0');
  document.getElementById('jamDigital').innerText = `${jam}:${menit}:${detik}`;
}
setInterval(perbaruiJam, 1000);
perbaruiJam();

let detikStopwatch = 0;
let timerInterval = null;

function mulaiStopwatch() {
  if (timerInterval !== null) return;
  timerInterval = setInterval(() => {
    detikStopwatch++;
    const m = String(Math.floor(detikStopwatch / 60)).padStart(2, '0');
    const s = String(detikStopwatch % 60).padStart(2, '0');
    document.getElementById('displayStopwatch').innerText = `${m}:${s}`;
  }, 1000);
}

function berhentiStopwatch() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetStopwatch() {
  berhentiStopwatch();
  detikStopwatch = 0;
  document.getElementById('displayStopwatch').innerText = '00:00';
}