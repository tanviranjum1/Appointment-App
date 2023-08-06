const mongoose = require("mongoose");
const colors = require("colors");
require("dotenv").config();
const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(
      colors.cyan.underline(`MongoDB Connected : ${conn.connection.host}`)
    );
  } catch (e) {
    console.error(
      colors.red(`${mongoURI}  Error: ${e.message}.red.underline.bold`)
    );
    process.exit(1);
  }
};

module.exports = connectDB;
