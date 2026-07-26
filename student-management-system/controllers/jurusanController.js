const Jurusan = require("../models/jurusanModel");


// ======================
// GET ALL
// ======================

exports.getAll = (req, res) => {

    Jurusan.getAllJurusan((err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data jurusan"
            });

        }

        res.json(result);

    });

};



// ======================
// GET BY ID
// ======================

exports.getById = (req, res) => {

    Jurusan.getJurusanById(req.params.id, (err, result) => {

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
                message: "Jurusan tidak ditemukan"
            });

        }

        res.json(result[0]);

    });

};



// ======================
// CREATE
// ======================

exports.create = (req, res) => {

    Jurusan.createJurusan(req.body, (err) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Gagal menambah jurusan"
            });

        }

        res.json({
            success: true,
            message: "Jurusan berhasil ditambahkan"
        });

    });

};



// ======================
// UPDATE
// ======================

exports.update = (req, res) => {

    Jurusan.updateJurusan(req.params.id, req.body, (err) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Gagal update jurusan"
            });

        }

        res.json({
            success: true,
            message: "Jurusan berhasil diupdate"
        });

    });

};



// ======================
// DELETE
// ======================

exports.delete = (req, res) => {

    Jurusan.deleteJurusan(req.params.id, (err) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Gagal menghapus jurusan"
            });

        }

        res.json({
            success: true,
            message: "Jurusan berhasil dihapus"
        });

    });

};