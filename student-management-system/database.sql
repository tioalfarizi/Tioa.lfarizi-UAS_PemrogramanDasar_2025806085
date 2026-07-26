CREATE DATABASE IF NOT EXISTS db_mahasiswa;

USE db_mahasiswa;


-- ==========================
-- TABEL JURUSAN
-- ==========================

CREATE TABLE jurusan (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nama_jurusan VARCHAR(100) NOT NULL

);



-- ==========================
-- TABEL MAHASISWA
-- ==========================

CREATE TABLE mahasiswa (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nama VARCHAR(100) NOT NULL,

    nim VARCHAR(20) NOT NULL UNIQUE,

    email VARCHAR(100),

    alamat TEXT,

    tanggal_lahir DATE,

    jurusan_id INT,


    FOREIGN KEY (jurusan_id)

    REFERENCES jurusan(id)

    ON UPDATE CASCADE

    ON DELETE SET NULL

);



-- ==========================
-- TABEL MATA KULIAH
-- ==========================

CREATE TABLE mata_kuliah (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nama_mk VARCHAR(100) NOT NULL,

    sks INT,

    semester INT

);




-- ==========================
-- DATA JURUSAN
-- ==========================

INSERT INTO jurusan
(nama_jurusan)

VALUES

('Teknik Informatika'),

('Sistem Informasi'),

('Manajemen Informatika');





-- ==========================
-- DATA MAHASISWA
-- ==========================

INSERT INTO mahasiswa

(nama,nim,email,alamat,tanggal_lahir,jurusan_id)

VALUES


(
'Andi Saputra',
'221001',
'andi@gmail.com',
'Tangerang',
'2004-01-10',
1
),


(
'Budi Setiawan',
'221002',
'budi@gmail.com',
'Jakarta',
'2004-05-20',
2
),


(
'Citra Lestari',
'221003',
'citra@gmail.com',
'Bekasi',
'2004-08-15',
1
);





-- ==========================
-- DATA MATA KULIAH
-- ==========================

INSERT INTO mata_kuliah

(nama_mk,sks,semester)

VALUES

('Pemrograman Dasar',3,1),

('Basis Data',3,2),

('Pemrograman Web',3,2);