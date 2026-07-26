const db = require("../config/db");


// ======================
// GET ALL
// ======================

exports.getAllMatkul = (callback) => {

    const sql = `

    SELECT

        mata_kuliah.*,

        jurusan.nama_jurusan

    FROM mata_kuliah

    LEFT JOIN jurusan

    ON mata_kuliah.jurusan_id = jurusan.id

    ORDER BY mata_kuliah.id DESC

    `;

    db.query(sql, callback);

};



// ======================
// GET BY ID
// ======================

exports.getMatkulById = (id, callback) => {

    const sql = `

    SELECT *

    FROM mata_kuliah

    WHERE id = ?

    `;

    db.query(sql, [id], callback);

};



// ======================
// CREATE
// ======================

exports.createMatkul = (data, callback) => {

    const sql = `

    INSERT INTO mata_kuliah

    (

        nama_matkul,

        sks,

        jurusan_id

    )

    VALUES

    (

        ?,

        ?,

        ?

    )

    `;

    db.query(

        sql,

        [

            data.nama_matkul,

            data.sks,

            data.jurusan_id

        ],

        callback

    );

};



// ======================
// UPDATE
// ======================

exports.updateMatkul = (id, data, callback) => {

    const sql = `

    UPDATE mata_kuliah

    SET

        nama_matkul = ?,

        sks = ?,

        jurusan_id = ?

    WHERE id = ?

    `;

    db.query(

        sql,

        [

            data.nama_matkul,

            data.sks,

            data.jurusan_id,

            id

        ],

        callback

    );

};



// ======================
// DELETE
// ======================

exports.deleteMatkul = (id, callback) => {

    const sql = `

    DELETE FROM mata_kuliah

    WHERE id = ?

    `;

    db.query(sql, [id], callback);

};