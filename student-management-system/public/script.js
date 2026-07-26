const API_MAHASISWA = "/api/mahasiswa";
const API_JURUSAN = "/api/jurusan";
const API_MATKUL = "/api/matkul";

let dataMahasiswa = [];
let chart = null;

let editMahasiswaId = null;
let editJurusanId = null;
let editMatkulId = null;


// ================================
// START
// ================================

window.onload = async function () {

    cekLogin();

    tampilTanggal();

    aktifMenu();

    aktifSearch();

    await loadSemuaData();

};



// ================================
// LOGIN
// ================================

function cekLogin() {

    if (localStorage.getItem("login") !== "true") {

        location.href = "login.html";

    }

}



// ================================
// LOAD DATA
// ================================

async function loadSemuaData() {

    await loadJurusan();

    await loadMahasiswa();

    await loadMatkul();

}



// ================================
// TANGGAL
// ================================

function tampilTanggal() {

    let el = document.getElementById("tanggal");

    if (!el) return;

    el.innerHTML = new Date().toLocaleDateString("id-ID", {

        day: "numeric",

        month: "long",

        year: "numeric"

    });

}



// ================================
// LOAD MAHASISWA
// ================================

async function loadMahasiswa() {

    try {

        const res = await fetch(API_MAHASISWA);

        dataMahasiswa = await res.json();

        document.getElementById("totalMahasiswa").innerHTML = dataMahasiswa.length;

        tampilMahasiswa(dataMahasiswa);

        buatChart();

    } catch (err) {

        console.log(err);

    }

}



// ================================
// TAMPIL MAHASISWA
// ================================

function tampilMahasiswa(data) {

    let tbody = document.getElementById("dataMahasiswa");

    if (!tbody) return;

    tbody.innerHTML = "";

    if (data.length == 0) {

        tbody.innerHTML = `

        <tr>

            <td colspan="6">

                Data mahasiswa tidak ditemukan

            </td>

        </tr>

        `;

        return;

    }

    data.forEach((m, i) => {

        tbody.innerHTML += `

        <tr>

            <td>${i + 1}</td>

            <td>${m.nama}</td>

            <td>${m.nim}</td>

            <td>${m.email || "-"}</td>

            <td>${m.nama_jurusan || "-"}</td>

            <td>

                <button onclick="editMahasiswa(${m.id})">

                    ✏ Edit

                </button>

                <button onclick="hapusMahasiswa(${m.id})">

                    🗑 Hapus

                </button>

            </td>

        </tr>

        `;

    });

}
// ================================
// SIMPAN MAHASISWA
// ================================

document
.getElementById("formMahasiswa")
?.addEventListener("submit", async function (e) {

    e.preventDefault();

    const data = {

        nama: document.getElementById("nama").value.trim(),

        nim: document.getElementById("nim").value.trim(),

        email: document.getElementById("email").value.trim(),

        alamat: document.getElementById("alamat").value.trim(),

        tanggal_lahir:
            document.getElementById("tanggal_lahir").value,

        jurusan_id:
            Number(document.getElementById("jurusan_id").value)

    };


    let url = API_MAHASISWA;
    let method = "POST";


    if (editMahasiswaId != null) {

        url += "/" + editMahasiswaId;

        method = "PUT";

    }


    try {

        const res = await fetch(url, {

            method,

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(data)

        });


        const hasil = await res.json();

        console.log(hasil);


        if (res.ok) {

            showToast("Data mahasiswa berhasil disimpan");

            editMahasiswaId = null;

            this.reset();

            await loadMahasiswa();

        } else {

            alert(hasil.message || "Gagal menyimpan mahasiswa");

        }

    } catch (err) {

        console.log(err);

        alert("Server error");

    }

});



// ================================
// EDIT MAHASISWA
// ================================

async function editMahasiswa(id) {

    try {

        const res = await fetch(API_MAHASISWA + "/" + id);

        const m = await res.json();


        document.getElementById("nama").value =
            m.nama || "";

        document.getElementById("nim").value =
            m.nim || "";

        document.getElementById("email").value =
            m.email || "";

        document.getElementById("alamat").value =
            m.alamat || "";

        document.getElementById("tanggal_lahir").value =
            m.tanggal_lahir
                ? m.tanggal_lahir.substring(0, 10)
                : "";

        document.getElementById("jurusan_id").value =
            m.jurusan_id;


        editMahasiswaId = id;


        document
            .getElementById("formMahasiswa")
            .scrollIntoView({

                behavior: "smooth"

            });

    } catch (err) {

        console.log(err);

    }

}



// ================================
// HAPUS MAHASISWA
// ================================

async function hapusMahasiswa(id) {

    if (!confirm("Hapus mahasiswa ini?")) return;

    try {

        await fetch(API_MAHASISWA + "/" + id, {

            method: "DELETE"

        });

        showToast("Mahasiswa berhasil dihapus");

        await loadMahasiswa();

    } catch (err) {

        console.log(err);

    }

}
// ======================================
// LOAD JURUSAN
// ======================================

async function loadJurusan() {

    try {

        const res = await fetch(API_JURUSAN);

        const data = await res.json();

        document.getElementById("totalJurusan").innerHTML = data.length;

        const selectMahasiswa = document.getElementById("jurusan_id");
        const selectMatkul = document.getElementById("matkul_jurusan_id");

        if (selectMahasiswa) {

            selectMahasiswa.innerHTML = `
                <option value="">Pilih Jurusan</option>
            `;

        }

        if (selectMatkul) {

            selectMatkul.innerHTML = `
                <option value="">Pilih Jurusan</option>
            `;

        }

        const tbody = document.getElementById("dataJurusan");

        if (tbody) {

            tbody.innerHTML = "";

        }

        data.forEach((j, i) => {

            if (selectMahasiswa) {

                selectMahasiswa.innerHTML += `
                    <option value="${j.id}">
                        ${j.nama_jurusan}
                    </option>
                `;

            }

            if (selectMatkul) {

                selectMatkul.innerHTML += `
                    <option value="${j.id}">
                        ${j.nama_jurusan}
                    </option>
                `;

            }

            if (tbody) {

                tbody.innerHTML += `
                    <tr>

                        <td>${i + 1}</td>

                        <td>${j.nama_jurusan}</td>

                        <td>

                            <button onclick="editJurusan(${j.id})">
                                ✏ Edit
                            </button>

                            <button onclick="hapusJurusan(${j.id})">
                                🗑 Hapus
                            </button>

                        </td>

                    </tr>
                `;

            }

        });

    } catch (err) {

        console.log(err);

    }

}



// ======================================
// SIMPAN JURUSAN
// ======================================

document
.getElementById("formJurusan")
?.addEventListener("submit", async function (e) {

    e.preventDefault();

    const data = {

        nama_jurusan:
            document.getElementById("nama_jurusan").value.trim()

    };

    let url = API_JURUSAN;
    let method = "POST";

    if (editJurusanId != null) {

        url += "/" + editJurusanId;

        method = "PUT";

    }

    const res = await fetch(url, {

        method,

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(data)

    });

    if (res.ok) {

        showToast("Jurusan berhasil disimpan");

        editJurusanId = null;

        this.reset();

        await loadJurusan();

    } else {

        alert("Gagal menyimpan jurusan");

    }

});



// ======================================
// EDIT JURUSAN
// ======================================

async function editJurusan(id) {

    const res = await fetch(API_JURUSAN + "/" + id);

    const data = await res.json();

    document.getElementById("nama_jurusan").value =
        data.nama_jurusan || "";

    editJurusanId = id;

}



// ======================================
// HAPUS JURUSAN
// ======================================

async function hapusJurusan(id) {

    if (!confirm("Hapus jurusan ini?")) return;

    const res = await fetch(API_JURUSAN + "/" + id, {

        method: "DELETE"

    });

    if (res.ok) {

        showToast("Jurusan berhasil dihapus");

        await loadJurusan();

        await loadMahasiswa();

    }

}
// ======================================
// LOAD MATA KULIAH
// ======================================

async function loadMatkul() {

    try {

        const res = await fetch(API_MATKUL);

        const data = await res.json();


        document.getElementById("totalMatkul").innerHTML =
            data.length;



        const tbody = document.getElementById("dataMatkul");


        if (!tbody) return;


        tbody.innerHTML = "";



        data.forEach((m, i) => {


            tbody.innerHTML += `

            <tr>

                <td>${i + 1}</td>

                <td>${m.nama_matkul}</td>

                <td>${m.sks}</td>

                <td>${m.nama_jurusan || "-"}</td>

                <td>

                    <button onclick="hapusMatkul(${m.id})">

                        🗑 Hapus

                    </button>

                </td>

            </tr>

            `;


        });



    } catch (err) {


        console.log(err);


    }


}





// ======================================
// TAMBAH MATA KULIAH
// ======================================


document
.getElementById("formMatkul")
?.addEventListener("submit", async function(e){


    e.preventDefault();



    const data = {


        nama_matkul:

            document.getElementById("nama_matkul").value.trim(),



        sks:

            document.getElementById("sks").value,



        jurusan_id:

            Number(
                document.getElementById("matkul_jurusan_id").value
            )


    };



    let url = API_MATKUL;

    let method = "POST";



    if(editMatkulId != null){


        url += "/" + editMatkulId;

        method = "PUT";


    }





    try{


        const res = await fetch(url, {


            method,


            headers:{


                "Content-Type":"application/json"


            },


            body:JSON.stringify(data)


        });




        const hasil = await res.json();

        console.log(hasil);




        if(res.ok){


            showToast("Mata kuliah berhasil disimpan");


            editMatkulId = null;


            this.reset();


            await loadMatkul();



        }else{


            alert(
                hasil.message || 
                "Gagal menyimpan mata kuliah"
            );


        }



    }catch(err){


        console.log(err);


    }


});





// ======================================
// HAPUS MATA KULIAH
// ======================================


async function hapusMatkul(id){


    if(!confirm("Hapus mata kuliah ini?")) return;



    const res = await fetch(

        API_MATKUL + "/" + id,

        {

            method:"DELETE"

        }

    );



    if(res.ok){


        showToast("Mata kuliah berhasil dihapus");


        await loadMatkul();


    }


}
// ======================================
// SEARCH MAHASISWA
// ======================================

function aktifSearch(){

    const searchInput = document.getElementById("search");


    if(!searchInput) return;



    searchInput.addEventListener("keyup",function(){


        let keyword = this.value.toLowerCase();



        let hasil = dataMahasiswa.filter((m)=>{


            return (

                String(m.nama || "")
                .toLowerCase()
                .includes(keyword)


                ||

                String(m.nim || "")
                .toLowerCase()
                .includes(keyword)


                ||

                String(m.email || "")
                .toLowerCase()
                .includes(keyword)


                ||

                String(m.nama_jurusan || "")
                .toLowerCase()
                .includes(keyword)


            );


        });



        tampilMahasiswa(hasil);



    });


}





// ======================================
// CHART
// ======================================


function buatChart(){


    const canvas =
    document.getElementById("chartMahasiswa");


    if(!canvas) return;



    let data = {};



    dataMahasiswa.forEach((m)=>{


        let jurusan =
        m.nama_jurusan || "Tidak ada";



        data[jurusan] =
        (data[jurusan] || 0) + 1;



    });



    if(chart){

        chart.destroy();

    }




    chart = new Chart(canvas,{


        type:"bar",


        data:{


            labels:Object.keys(data),



            datasets:[{


                label:"Jumlah Mahasiswa",


                data:Object.values(data),


                borderWidth:2


            }]


        },


        options:{


            responsive:true


        }



    });



}





// ======================================
// DARK MODE
// ======================================


function darkMode(){


    document.body.classList.toggle("dark");


}





// ======================================
// MENU SIDEBAR
// ======================================


function aktifMenu(){


    const menu =
    document.querySelectorAll(".sidebar a");



    menu.forEach((a)=>{


        a.onclick=function(){



            menu.forEach((x)=>{

                x.classList.remove("active");

            });



            this.classList.add("active");



        };


    });


}





// ======================================
// LOGOUT
// ======================================


document
.getElementById("logoutBtn")
?.addEventListener("click",function(e){


    e.preventDefault();



    localStorage.removeItem("login");



    location.href="login.html";



});





// ======================================
// TOAST
// ======================================


function showToast(text){


    const toast =
    document.getElementById("toast");



    if(!toast) return;



    toast.innerHTML = text;



    toast.classList.add("show");



    setTimeout(()=>{


        toast.classList.remove("show");


    },2000);



}