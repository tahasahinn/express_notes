const express = require("express");
const router = express.Router();
const {
  notOlustur,
  notlarGetir,
  notGetir,
  notSil,
  notGuncelle,
} = require("../controllers/notControllers.js");

router.get("/", notlarGetir);

router.post("/", notOlustur);

router.get("/:id", notGetir);

router.delete("/:id", notSil);

router.patch("/:id", notGuncelle);

module.exports = router;
