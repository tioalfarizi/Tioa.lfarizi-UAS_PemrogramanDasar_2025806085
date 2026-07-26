const express = require("express");
const router = express.Router();

const jurusanController = require("../controllers/jurusanController");


// ======================
// GET ALL
// ======================

router.get("/", jurusanController.getAll);


// ======================
// GET BY ID
// ======================

router.get("/:id", jurusanController.getById);


// ======================
// CREATE
// ======================

router.post("/", jurusanController.create);


// ======================
// UPDATE
// ======================

router.put("/:id", jurusanController.update);


// ======================
// DELETE
// ======================

router.delete("/:id", jurusanController.delete);


module.exports = router;