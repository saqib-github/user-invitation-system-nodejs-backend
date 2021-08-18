const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    first_name: String,
    last_name: String,
    address: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);

module.exports = User;
