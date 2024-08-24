const express = require("express");
const router = express.Router();

const orderCtrl = require("../controllers/order");

router.post("/New", orderCtrl.createOrder);

router.delete("/Delete/:id", orderCtrl.deleteOrder);

router.get("/One/:id", orderCtrl.getOneOrder);

router.get("/All", orderCtrl.getAllOrders);

router.get("/Count", orderCtrl.countOrders);

module.exports = router;
