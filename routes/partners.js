const express = require("express");
const router = express.Router();

const partnersCtrl = require("../controllers/partners.js");

router.post("/", partnersCtrl.createPartner);

router.put("/:id", partnersCtrl.modifyPartner);

router.delete("/:id", partnersCtrl.deletePartner);

router.get("/:id", partnersCtrl.getOnePartner);

router.get("/", partnersCtrl.getAllPartners);

module.exports = router;
