const express = require("express");
const router = express.Router();

const mahasiswaController = require("../controllers/mahasiswaController");


// ======================
// GET ALL
// ======================

router.get("/", mahasiswaController.getAll);


// ======================
// GET BY ID
// ======================

router.get("/:id", mahasiswaController.getById);


// ======================
// CREATE
// ======================

router.post("/", mahasiswaController.create);


// ======================
// UPDATE
// ======================

router.put("/:id", mahasiswaController.update);


// ======================
// DELETE
// ======================

router.delete("/:id", mahasiswaController.delete);


module.exports = router;