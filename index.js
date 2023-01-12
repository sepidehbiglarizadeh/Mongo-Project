const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/mongoproject")
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("could not connect to mongodb"));
