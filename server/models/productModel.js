const mongoose = require("mongoose");

const productshema = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
  ratings: String,
  images: [
    {
      image: String,
    },
  ],
  category: String,
  seller: String,
  stock: String,
  numOfReviews: String,
  createdAt: Date,
});
const productmodel = mongoose.model("product", productshema);
module.exports = productmodel;
