const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verifytoken");

const partnersCtrl = require("../controllers/partners.js");

router.post("/New", verifyToken, partnersCtrl.createPartner);

router.put("/Put/:id", verifyToken, partnersCtrl.modifyPartner);
router.delete("/Delete/:id", verifyToken, partnersCtrl.deletePartner);

router.get("/:id", partnersCtrl.getOnePartner);

router.get("/", partnersCtrl.getAllPartners);

module.exports = router;
