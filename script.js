let dataEmail = [
  {
    id: 1,
    pengirim: "Andi Sensei",
    subjek: "URGENT: Jadwal latihan besok berubah",
    isi: "Latihan besok dipindah ke jam 09.00 ya, jangan telat!",
    tanggal: "08:15",
    terbaca: false,
    berbintang: true,
    dipilih: false,
  },
  {
    id: 2,
    pengirim: "Rina-kun",
    subjek: "Catatan tugas JS minggu ini",
    isi: "Kumpulin tugas DOMailer sebelum Jumat ya.",
    tanggal: "08:40",
    terbaca: false,
    berbintang: false,
    dipilih: false,
  },
  {
    id: 3,
    pengirim: "Komunitas Code",
    subjek: "IMPORTANT: Info meetup minggu depan",
    isi: "Ada meetup santai minggu depan, tema JavaScript dasar. Yang minat boleh ikut!",
    tanggal: "09:05",
    terbaca: false,
    berbintang: true,
    dipilih: false,
  },
  {
    id: 4,
    pengirim: "Pak Dosen",
    subjek: "Review materi DOM",
    isi: "Bisa dipelajari lagi materi kemarin buat latihan tambahan.",
    tanggal: "09:30",
    terbaca: true,
    berbintang: false,
    dipilih: false,
  },
  {
    id: 5,
    pengirim: "Yuki-san",
    subjek: "Sharing file latihan",
    isi: "Aku share contoh latihan kemarin di grup ya.",
    tanggal: "10:00",
    terbaca: true,
    berbintang: false,
    dipilih: false,
  },
  {
    id: 6,
    pengirim: "Admin Grup",
    subjek: "Pengumunan deadline project",
    isi: "Deadline project akhir minggu ini ya, jangan lupa!",
    tanggal: "10:20",
    terbaca: true,
    berbintang: false,
    dipilih: false,
  },
  {
    id: 7,
    pengirim: "Support IT",
    subjek: "URGENT: Perubahan akses repo",
    isi: "Akses repo sementara di-update, login ulang dulu ya.",
    tanggal: "10:50",
    terbaca: false,
    berbintang: true,
    dipilih: false,
  },
  {
    id: 8,
    pengirim: "Toko Otaku",
    subjek: "Promo merch terbatas",
    isi: "Ada promo item terbatas nih, buruan cek sebelum habis!",
    tanggal: "11:25",
    terbaca: true,
    berbintang: false,
    dipilih: false,
  },
  {
    id: 9,
    pengirim: "Aji-kun",
    subjek: "Reimburse sudah diapprove",
    isi: "Dana reimburse udah di-approve, bisa dicek ya.",
    tanggal: "11:55",
    terbaca: true,
    berbintang: true,
    dipilih: false,
  },
  {
    id: 10,
    pengirim: "QA Team",
    subjek: "Lapor bug kecil",
    isi: "Coba cek checkbox select all pas filter aktif ya.",
    tanggal: "12:15",
    terbaca: false,
    berbintang: false,
    dipilih: false,
  },
];

let filterAktif = "all";
let cariKata = "";
let idBaru = dataEmail.length + 1;

let daftarEmail = document.getElementById("daftarEmail");
let unreadCount = document.getElementById("unread");
let starredCount = document.getElementById("starred");
let pilihSemua = document.getElementById("pilihSemua");
let selectedBar = document.getElementById("selectedBar");
let jmlPilih = document.getElementById("jmlPilih");
let searchInput = document.getElementById("search");
let btnFilter = document.querySelectorAll(".btnFilter");
let btnCompose = document.getElementById("btnCompose");
let composeForm = document.getElementById("composeForm");
let kosong = document.getElementById("kosong");

function updateHitung() {
  let jmlUnread = 0;
  let jmlStar = 0;
  for (let i = 0; i < dataEmail.length; i++) {
    if (dataEmail[i].terbaca === false) {
      jmlUnread++;
    }
    if (dataEmail[i].berbintang === true) {
      jmlStar++;
    }
  }
  unreadCount.innerText = jmlUnread;
  starredCount.innerText = jmlStar;
}

function updatePilih() {
  let jmlDipilih = 0;
  for (let i = 0; i < dataEmail.length; i++) {
    if (dataEmail[i].dipilih === true) {
      jmlDipilih++;
    }
  }
  if (jmlDipilih > 0) {
    selectedBar.style.display = "flex";
    jmlPilih.innerText = jmlDipilih;
  } else {
    selectedBar.style.display = "none";
  }
}

function cekPenting(subjek) {
  let s = subjek.toUpperCase();
  if (s.includes("URGENT") || s.includes("IMPORTANT")) {
    return true;
  }
  return false;
}

function renderEmail() {
  daftarEmail.innerHTML = "";

  let dataTampil = [];
  for (let i = 0; i < dataEmail.length; i++) {
    let e = dataEmail[i];
    let cocokCari = false;
    if (cariKata === "") {
      cocokCari = true;
    } else {
      let kata = cariKata.toLowerCase();
      if (
        e.pengirim.toLowerCase().includes(kata) ||
        e.subjek.toLowerCase().includes(kata)
      ) {
        cocokCari = true;
      }
    }

    if (cocokCari === false) {
      continue;
    }

    if (filterAktif === "unread" && e.terbaca === true) {
      continue;
    }
    if (filterAktif === "starred" && e.berbintang === false) {
      continue;
    }

    dataTampil.push(e);
  }

  if (dataTampil.length === 0) {
    kosong.style.display = "block";
  } else {
    kosong.style.display = "none";
  }

  for (let i = 0; i < dataTampil.length; i++) {
    let e = dataTampil[i];
    let tr = document.createElement("tr");
    tr.setAttribute("data-id", e.id);

    if (e.terbaca === true) {
      tr.classList.add("read");
    } else {
      tr.classList.add("unread");
    }
    if (e.dipilih === true) {
      tr.classList.add("dipilih");
    }

    let tdCheck = document.createElement("td");
    let cek = document.createElement("input");
    cek.type = "checkbox";
    cek.checked = e.dipilih;
    cek.onclick = function () {
      pilihSatu(e.id, cek.checked);
    };
    tdCheck.appendChild(cek);

    let tdStar = document.createElement("td");
    let bintangEl = document.createElement("div");
    bintangEl.className = "bintang";
    if (e.berbintang === true) {
      bintangEl.classList.add("aktif");
    }
    bintangEl.innerText = "★";
    bintangEl.onclick = function (evt) {
      evt.stopPropagation();
      toggleBintang(e.id);
    };
    tdStar.appendChild(bintangEl);
    tdStar.style.textAlign = "center";

    let tdPengirim = document.createElement("td");
    tdPengirim.innerText = e.pengirim;

    let tdSubjek = document.createElement("td");
    let divSubjek = document.createElement("div");
    divSubjek.className = "subjekUtama";
    if (cekPenting(e.subjek)) {
      let badge = document.createElement("span");
      badge.className = "badgePenting";
      badge.innerText = "PENTING/URGENT";
      divSubjek.appendChild(badge);
    }
    let teksSubjek = document.createTextNode(e.subjek);
    divSubjek.appendChild(teksSubjek);
    let divIsi = document.createElement("div");
    divIsi.className = "isiPesan";
    divIsi.innerText = e.isi;
    tdSubjek.appendChild(divSubjek);
    tdSubjek.appendChild(divIsi);

    let tdTanggal = document.createElement("td");
    tdTanggal.innerText = e.tanggal;

    let tdAksi = document.createElement("td");
    let hapusEl = document.createElement("div");
    hapusEl.className = "hapusBtn";
    hapusEl.innerText = "Hapus";
    hapusEl.onclick = function (evt) {
      evt.stopPropagation();
      hapusSatu(e.id);
    };
    tdAksi.appendChild(hapusEl);
    tdAksi.style.textAlign = "right";

    tr.appendChild(tdCheck);
    tr.appendChild(tdStar);
    tr.appendChild(tdPengirim);
    tr.appendChild(tdSubjek);
    tr.appendChild(tdTanggal);
    tr.appendChild(tdAksi);

    tr.onclick = function () {
      toggleBaca(e.id);
    };

    daftarEmail.appendChild(tr);
  }

  // sync checkbox pilih semua
  let semuaTerpilih = true;
  if (dataTampil.length === 0) {
    semuaTerpilih = false;
  }
  for (let i = 0; i < dataTampil.length; i++) {
    if (dataTampil[i].dipilih === false) {
      semuaTerpilih = false;
      break;
    }
  }
  pilihSemua.checked = semuaTerpilih;

  updateHitung();
  updatePilih();
}

function pilihSatu(id, cek) {
  for (let i = 0; i < dataEmail.length; i++) {
    if (dataEmail[i].id === id) {
      dataEmail[i].dipilih = cek;
      break;
    }
  }
  renderEmail();
}

function pilihSemuaFungsi() {
  let cek = pilihSemua.checked;
  for (let i = 0; i < dataEmail.length; i++) {
    let e = dataEmail[i];

    let cocokCari = false;
    if (cariKata === "") {
      cocokCari = true;
    } else {
      let kata = cariKata.toLowerCase();
      if (
        e.pengirim.toLowerCase().includes(kata) ||
        e.subjek.toLowerCase().includes(kata)
      ) {
        cocokCari = true;
      }
    }
    if (cocokCari === false) continue;
    if (filterAktif === "unread" && e.terbaca === true) continue;
    if (filterAktif === "starred" && e.berbintang === false) continue;

    dataEmail[i].dipilih = cek;
  }
  renderEmail();
}

function toggleBintang(id) {
  for (let i = 0; i < dataEmail.length; i++) {
    if (dataEmail[i].id === id) {
      dataEmail[i].berbintang = !dataEmail[i].berbintang;
      break;
    }
  }
  renderEmail();
}

function toggleBaca(id) {
  for (let i = 0; i < dataEmail.length; i++) {
    if (dataEmail[i].id === id) {
      dataEmail[i].terbaca = !dataEmail[i].terbaca;
      break;
    }
  }
  renderEmail();
}

function hapusSatu(id) {
  let baru = [];
  for (let i = 0; i < dataEmail.length; i++) {
    if (dataEmail[i].id !== id) {
      baru.push(dataEmail[i]);
    }
  }
  dataEmail = baru;
  renderEmail();
}

function tandaiSudahBaca() {
  for (let i = 0; i < dataEmail.length; i++) {
    if (dataEmail[i].dipilih === true) {
      dataEmail[i].terbaca = true;
      dataEmail[i].dipilih = false;
    }
  }
  renderEmail();
}

function hapusTerpilih() {
  let baru = [];
  for (let i = 0; i < dataEmail.length; i++) {
    if (dataEmail[i].dipilih === false) {
      baru.push(dataEmail[i]);
    }
  }
  dataEmail = baru;
  renderEmail();
}

searchInput.oninput = function () {
  cariKata = searchInput.value;
  renderEmail();
};

for (let i = 0; i < btnFilter.length; i++) {
  btnFilter[i].onclick = function () {
    for (let j = 0; j < btnFilter.length; j++) {
      btnFilter[j].classList.remove("active");
    }
    this.classList.add("active");
    filterAktif = this.getAttribute("data-filter");
    renderEmail();
  };
}

btnCompose.onclick = function () {
  if (composeForm.style.display === "none") {
    composeForm.style.display = "block";
  } else {
    composeForm.style.display = "none";
  }
};

function batalCompose() {
  composeForm.style.display = "none";
  document.getElementById("pengirim").value = "";
  document.getElementById("subjek").value = "";
  document.getElementById("isiPesan").value = "";
}

function kirimPesan() {
  let pengirim = document.getElementById("pengirim").value;
  let subjek = document.getElementById("subjek").value;
  let isiPesan = document.getElementById("isiPesan").value;

  if (pengirim === "" || subjek === "" || isiPesan === "") {
    alert("Semua kolom harus diisi ya!");
    return;
  }

  let tanggalBaru = new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  let emailBaru = {
    id: idBaru,
    pengirim: pengirim,
    subjek: subjek,
    isi: isiPesan,
    tanggal: tanggalBaru,
    terbaca: false,
    berbintang: false,
    dipilih: false,
  };

  idBaru++;
  dataEmail.unshift(emailBaru);

  document.getElementById("pengirim").value = "";
  document.getElementById("subjek").value = "";
  document.getElementById("isiPesan").value = "";
  composeForm.style.display = "none";

  renderEmail();
}

renderEmail();