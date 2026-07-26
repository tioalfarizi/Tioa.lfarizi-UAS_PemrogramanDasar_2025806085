const db = require("../config/db");


// ======================
// GET ALL
// ======================

exports.getAllMahasiswa = (callback) => {

    const sql = `

    SELECT

        mahasiswa.*,

        jurusan.nama_jurusan

    FROM mahasiswa

    LEFT JOIN jurusan

    ON mahasiswa.jurusan_id = jurusan.id

    ORDER BY mahasiswa.id DESC

    `;

    db.query(sql, callback);

};



// ======================
// GET BY ID
// ======================

exports.getMahasiswaById = (id, callback) => {

    const sql = `

    SELECT *

    FROM mahasiswa

    WHERE id = ?

    `;

    db.query(sql, [id], callback);

};



// ======================
// CREATE
// ======================

exports.createMahasiswa = (data, callback) => {

    const sql = `

    INSERT INTO mahasiswa

    (

        nama,

        nim,

        email,

        alamat,

        tanggal_lahir,

        jurusan_id

    )

    VALUES

    (

        ?,

        ?,

        ?,

        ?,

        ?,

        ?

    )

    `;

    db.query(

        sql,

        [

            data.nama,

            data.nim,

            data.email,

            data.alamat,

            data.tanggal_lahir || null,

            data.jurusan_id

        ],

        callback

    );

};



// ======================
// UPDATE
// ======================

exports.updateMahasiswa = (id, data, callback) => {

    const sql = `

    UPDATE mahasiswa

    SET

        nama = ?,

        nim = ?,

        email = ?,

        alamat = ?,

        tanggal_lahir = ?,

        jurusan_id = ?

    WHERE id = ?

    `;

    db.query(

        sql,

        [

            data.nama,

            data.nim,

            data.email,

            data.alamat,

            data.tanggal_lahir || null,

            data.jurusan_id,

            id

        ],

        callback

    );

};



// ======================
// DELETE
// ======================

exports.deleteMahasiswa = (id, callback) => {

    const sql = `

    DELETE FROM mahasiswa

    WHERE id = ?

    `;

    db.query(sql, [id], callback);

};