const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String, min: 8 },
  firstName: String,
  surname: String,
  birth: Date,
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
