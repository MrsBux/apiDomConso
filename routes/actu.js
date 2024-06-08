const express = require("express");
const router = express.Router();

const actuCtrl = require("../controllers/actu");

router.post("/New", actuCtrl.createActu);

router.delete("/:id", actuCtrl.deleteActu);

router.get("/All", actuCtrl.getAllActu);

module.exports = router;
