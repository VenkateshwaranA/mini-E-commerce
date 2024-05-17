const mongoose = require("mongoose");
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((conect) => {
      console.log(`mongoDb connect successfully :${conect.connection.host}`);
    })
    .catch((err) => {
      console.log("error in mongodb connection", err);
    });
};

module.exports = connectDatabase;
