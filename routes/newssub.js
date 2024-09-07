const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verifytoken");

const newssubCtrl = require("../controllers/newssub.js");

router.post("/post", newssubCtrl.createNewsSub);

router.delete("/:id", verifyToken, newssubCtrl.deleteNewsSub);

router.get("/:id", verifyToken, newssubCtrl.getOneNewsSub);

router.get("/", verifyToken, newssubCtrl.getAllNewsSubs);

module.exports = router;
