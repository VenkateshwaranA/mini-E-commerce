const ordermodel = require("../models/orderModel");
const productmodel = require("../models/productModel");

exports.createOrder = async (req, res, next) => {
  try {
    const cartItems = req.body;
    const amount = Number(
      req.body.reduce(
        (oldval, currentval) =>
          oldval + currentval.products.price * currentval.qty,
        0
      )
    ).toFixed(2);
    const status = "pending";
    const orderCreated = await ordermodel.create({ cartItems, amount, status });

    // update product model
console.log(cartItems);


    cartItems.forEach(async (item) => {
      console.log(item);
      const product = await productmodel.findById(item.products._id);
      product.stock = product.stock - item.qty;
      await product.save();
    });

    res.status(200).json({
      success: true,
      orderCreated,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error,
    });
  }
};
