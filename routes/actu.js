const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifytoken");

const actuCtrl = require("../controllers/actu");

router.post("/New", verifyToken, actuCtrl.createActu);

router.delete("/:id", verifyToken, actuCtrl.deleteActu);

router.get("/All", actuCtrl.getAllActu);

module.exports = router;
