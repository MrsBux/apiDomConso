const express = require("express");
const router = express.Router();

const newssubCtrl = require("../controllers/newssub.js");

router.post("/", newssubCtrl.createNewsSub);

router.delete("/:id", newssubCtrl.deleteNewsSub);

router.get("/:id", newssubCtrlCtrl.getOneNewsSub);

router.get("/", newssubCtrl.getAllNewsSubs);

module.exports = router;
