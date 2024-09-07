const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifytoken");

const orderCtrl = require("../controllers/order");

router.post("/New", orderCtrl.createOrder);

router.delete("/Delete/:id", orderCtrl.deleteOrder);

router.get("/One/:id", verifyToken, orderCtrl.getOneOrder);

router.get("/All", verifyToken, orderCtrl.getAllOrders);

router.get("/Count", verifyToken, orderCtrl.countOrders);

module.exports = router;
