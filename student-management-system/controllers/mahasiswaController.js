const Mahasiswa = require("../models/mahasiswaModel");


// ======================
// GET ALL
// ======================

exports.getAll = (req, res) => {

    Mahasiswa.getAllMahasiswa((err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data mahasiswa"
            });

        }

        res.json(result);

    });

};



// ======================
// GET BY ID
// ======================

exports.getById = (req, res) => {

    Mahasiswa.getMahasiswaById(req.params.id, (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Terjadi kesalahan"
            });

        }

        if (result.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Mahasiswa tidak ditemukan"
            });

        }

        res.json(result[0]);

    });

};



// ======================
// CREATE
// ======================

exports.create = (req, res) => {

    const data = {

        nama: req.body.nama,

        nim: req.body.nim,

        email: req.body.email,

        alamat: req.body.alamat,

        tanggal_lahir: req.body.tanggal_lahir || null,

        jurusan_id: Number(req.body.jurusan_id)

    };


    Mahasiswa.createMahasiswa(data, (err) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Gagal menambah mahasiswa",
                error: err.sqlMessage
            });

        }

        res.json({
            success: true,
            message: "Mahasiswa berhasil ditambahkan"
        });

    });

};



// ======================
// UPDATE
// ======================

exports.update = (req, res) => {

    const data = {

        nama: req.body.nama,

        nim: req.body.nim,

        email: req.body.email,

        alamat: req.body.alamat,

        tanggal_lahir: req.body.tanggal_lahir || null,

        jurusan_id: Number(req.body.jurusan_id)

    };


    Mahasiswa.updateMahasiswa(req.params.id, data, (err) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Gagal update mahasiswa"
            });

        }

        res.json({
            success: true,
            message: "Mahasiswa berhasil diupdate"
        });

    });

};



// ======================
// DELETE
// ======================

exports.delete = (req, res) => {

    Mahasiswa.deleteMahasiswa(req.params.id, (err) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Gagal menghapus mahasiswa"
            });

        }

        res.json({
            success: true,
            message: "Mahasiswa berhasil dihapus"
        });

    });

};