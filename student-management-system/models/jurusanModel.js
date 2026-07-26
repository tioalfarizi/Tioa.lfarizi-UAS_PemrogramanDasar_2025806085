const db = require("../config/db");


// ======================
// GET ALL
// ======================

exports.getAllJurusan = (callback) => {

    const sql = `

    SELECT *

    FROM jurusan

    ORDER BY id ASC

    `;

    db.query(sql, callback);

};



// ======================
// GET BY ID
// ======================

exports.getJurusanById = (id, callback) => {

    const sql = `

    SELECT *

    FROM jurusan

    WHERE id = ?

    `;

    db.query(sql, [id], callback);

};



// ======================
// CREATE
// ======================

exports.createJurusan = (data, callback) => {

    const sql = `

    INSERT INTO jurusan

    (

        nama_jurusan

    )

    VALUES

    (

        ?

    )

    `;

    db.query(

        sql,

        [

            data.nama_jurusan

        ],

        callback

    );

};



// ======================
// UPDATE
// ======================

exports.updateJurusan = (id, data, callback) => {

    const sql = `

    UPDATE jurusan

    SET

        nama_jurusan = ?

    WHERE id = ?

    `;

    db.query(

        sql,

        [

            data.nama_jurusan,

            id

        ],

        callback

    );

};



// ======================
// DELETE
// ======================

exports.deleteJurusan = (id, callback) => {

    const sql = `

    DELETE FROM jurusan

    WHERE id = ?

    `;

    db.query(sql, [id], callback);

};