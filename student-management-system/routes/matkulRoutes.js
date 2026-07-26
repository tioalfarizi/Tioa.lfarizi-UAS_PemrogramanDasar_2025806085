const express = require("express");
const router = express.Router();

const matkulController = require("../controllers/matkulController");


// ======================
// GET ALL
// ======================

router.get("/", matkulController.getAll);


// ======================
// GET BY ID
// ======================

router.get("/:id", matkulController.getById);


// ======================
// CREATE
// ======================

router.post("/", matkulController.create);


// ======================
// UPDATE
// ======================

router.put("/:id", matkulController.update);


// ======================
// DELETE
// ======================

router.delete("/:id", matkulController.delete);


module.exports = router;