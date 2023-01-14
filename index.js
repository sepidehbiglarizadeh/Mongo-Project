const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/mongoproject")
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("could not connect to mongodb"));

//* create a schema
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    minlength: 3,
    maxlength: 20,
    lowercase: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: function () {
      this.admin;
    },
  },
  favourites: {
    type: [String],
    enum: ["sport", "politic", "music"],
    required: true,
    validate: {
      validator: function (v) {
        return v && v.length >= 1;
      },
      message: "favourites field should have at least one item",
    },
  },
  date: { type: Date, default: Date.now },
  admin: Boolean,
  age: { type: Number, min: 8, max: 120 },
  salary: {
    type: Number,
    required: true,
    set: (v) => Math.round(v),
    get: (v) => Math.round(v),
  },
});

//* create a model
const User = mongoose.model("User", userSchema);

const createUser = async () => {
  //? create a user
  const user = new User({
    first_name: " TEST ",
    last_name: "test123",
    favourites: ["sport", "politic", "music"],
    admin: true,
    age: 31,
    salary: 16.9,
  });

  try {
    const result = await user.save();
    console.log(result);
  } catch (ex) {
    console.log("error :", ex.message);
  }
};

createUser();

async function getUser() {
  const pageNumber = 1;
  const pageSize = 8;
  const users = await User.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
  console.log(users);
}

async function updateUser(id) {
  const user = await User.update(
    { _id: id },
    {
      $set: {
        first_name: "updated name 2",
      },
    }
  );
  console.log(user);
}

async function removeUser(id) {
  const result = await User.deleteOne({ _id: id });
  console.log(result);
}

// getUser();
// updateUser("63bfff8e3120272aba9f74dc");
// removeUser("63bfff8e3120272aba9f74dc");
