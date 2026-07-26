const Matkul = require("../models/matkulModel");


// ======================
// GET ALL
// ======================

exports.getAll = (req, res) => {

    Matkul.getAllMatkul((err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data mata kuliah"
            });

        }

        res.json(result);

    });

};



// ======================
// GET BY ID
// ======================

exports.getById = (req, res) => {

    Matkul.getMatkulById(req.params.id, (err, result) => {

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
                message: "Data tidak ditemukan"
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

        nama_matkul: req.body.nama_matkul,

        sks: req.body.sks,

        jurusan_id: Number(req.body.jurusan_id)

    };


    Matkul.createMatkul(data, (err) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Gagal menambah mata kuliah",
                error: err.sqlMessage
            });

        }

        res.json({
            success: true,
            message: "Mata kuliah berhasil ditambahkan"
        });

    });

};



// ======================
// UPDATE
// ======================

exports.update = (req, res) => {

    const data = {

        nama_matkul: req.body.nama_matkul,

        sks: req.body.sks,

        jurusan_id: Number(req.body.jurusan_id)

    };


    Matkul.updateMatkul(req.params.id, data, (err) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Gagal update mata kuliah"
            });

        }

        res.json({
            success: true,
            message: "Mata kuliah berhasil diupdate"
        });

    });

};



// ======================
// DELETE
// ======================

exports.delete = (req, res) => {

    Matkul.deleteMatkul(req.params.id, (err) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Gagal menghapus mata kuliah"
            });

        }

        res.json({
            success: true,
            message: "Mata kuliah berhasil dihapus"
        });

    });

};