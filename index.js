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

async function getUser() {
  const pageNumber = 1;
  const pageSize = 8;
  const users = await User.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
  console.log(users);
}

async function updateUser(id) {
  const user = await User.findById(id);
  if (!user) return;
  user.set({ first_name: "updated name", admin: true });
  await user.save();
  console.log(user);
}

// getUser();
updateUser("63bfff8e3120272aba9f74dc");
