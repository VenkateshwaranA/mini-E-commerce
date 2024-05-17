const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const connectDatabase = require("./config/connectDatabase");
dotenv.config({ path: path.join(__dirname, "config", "config.env") });
const product = require("./routes/product");
const orders = require("./routes/order");
const cors= require("cors")
// mongoDb connected
connectDatabase();
// route declre
app.use(express.json());
app.use(cors())
app.use("/api/v1/", product);
app.use("/api/v1", orders);

// without router initial url - http://localhost:port
app.get("/", (req, res) => {
  res.json({
    success: true,
    data: "venkiii",
  });
});
app.listen(process.env.PORT, (req, res) => {
  console.log(`server is working ${process.env.PORT}`);
});
