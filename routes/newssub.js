const express = require("express");
const router = express.Router();

const newssubCtrl = require("../controllers/newssub.js");

router.post("/post", newssubCtrl.createNewsSub);

router.delete("/:id", newssubCtrl.deleteNewsSub);

router.get("/:id", newssubCtrl.getOneNewsSub);

router.get("/", newssubCtrl.getAllNewsSubs);

module.exports = router;
