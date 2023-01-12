const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/mongoproject")
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("could not connect to mongodb"));

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: { type: String, required: true },
  favourites: [String],
  date: { type: Date, default: Date.now },
  admin: Boolean,
});
