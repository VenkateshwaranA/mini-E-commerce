const getProductsData = require("../models/productModel");

exports.getProducts = async (req, res, next) => {
  let query = req.query.query
    ? {
        name: {
          $regex: req.query.query,
          $options: "i",
        },
      }
    : {};
  const products = await getProductsData.find(query);
  try {
    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "invalid url",
    });
  }
};
exports.getSingleProduct = async (req, res, next) => {
  try {
    const singleProduct = await getProductsData.findById(req.params.id);
    res.json({
      success: true,
      product: singleProduct,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "invalid id",
    });
  }
};
