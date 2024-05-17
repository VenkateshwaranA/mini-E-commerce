const express = require("express");
const { createOrder } = require("../controller/orderController");
const orders = express.Router();

orders.route("/order").post(createOrder);

module.exports = orders;
