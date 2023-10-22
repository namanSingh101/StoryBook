const mongoose = require("mongoose");
require("dotenv").config({ path: "../config/config.env" });

function dbConnection() {
  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = dbConnection
