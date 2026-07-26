require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// DATABASE
require("./config/db");

// ROUTES
const mahasiswaRoutes = require("./routes/mahasiswaRoutes");
const jurusanRoutes = require("./routes/jurusanRoutes");
const matkulRoutes = require("./routes/matkulRoutes");

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// FRONTEND
app.use(express.static(path.join(__dirname, "public")));

// HOME
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API
app.use("/api/mahasiswa", mahasiswaRoutes);
app.use("/api/jurusan", jurusanRoutes);
app.use("/api/matkul", matkulRoutes);

// TEST
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "API Student Management System Berjalan"
    });
});

// 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint tidak ditemukan"
    });
});

// ERROR
app.use((err, req, res, next) => {
    console.log(err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message
    });
});

// SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("======================================");
    console.log(" STUDENT MANAGEMENT SYSTEM");
    console.log("======================================");
    console.log(`Server : http://localhost:${PORT}`);
    console.log("======================================");

});