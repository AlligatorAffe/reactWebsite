const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/*
     username: accountUsername,
      password: hashedPwd,
      email: accountEmail,
      name: firstName + " " + lastName,
*/

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  roles: {
    user: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
