const express = require("express");
const router = express.Router();

const partnersCtrl = require("../controllers/partners.js");

router.post("/New", partnersCtrl.createPartner);

router.put("/Put/:id", partnersCtrl.modifyPartner);
router.delete("/Delete/:id", partnersCtrl.deletePartner);

router.get("/:id", partnersCtrl.getOnePartner);

router.get("/", partnersCtrl.getAllPartners);

module.exports = router;
