const express = require("express");
const router = express.Router();

const actuCtrl = require("../controllers/actu");

router.post("/", actuCtrl.createActu);

router.delete("/:id", actuCtrl.deleteActu);

router.get("/", actuCtrl.getAllActu);

module.exports = router;
