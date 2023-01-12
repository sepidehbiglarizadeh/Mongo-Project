const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/mongoproject")
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("could not connect to mongodb"));

//* create a schema
const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: { type: String, required: true },
  favourites: [String],
  date: { type: Date, default: Date.now },
  admin: Boolean,
});

//* create a model
const User = mongoose.model("User", userSchema);

const createUser = async () => {
  //? create a user
  const user = new User({
    first_name: "test",
    last_name: "test123",
    favourites: ["sport", "data science", "music"],
    admin: true,
  });

  //? save user in database
  const result = await user.save();
  console.log(result);
};

// createUser();

//* Query
async function getUser() {
  const users = await User.find({ last_name: "test123" })
    .limit(2)
    .sort({ first_name: -1 })
    .select({ first_name: 1, last_name: 1 })
    .count();
  console.log(users);
}

getUser();
