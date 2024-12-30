const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: function (name) {
        const nameRegex = /^[a-zA-Z\s]{3,50}$/;
        return nameRegex.test(name);
      },
      message: "Name should contain only alphabets and spaces.",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,  
    index: true,
    validate: {
      validator: function (value) {
        const emailRegex = /^[a-zA-Z0-9]+[a-zA-Z0-9-.]{2,}@(gmail)\.(com|in)$/;
        return emailRegex.test(value);
      },
      message: "Invalid Email.",
    },
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (userName) {
        const userNameRegex = /^[a-zA-Z0-9_-]{4,20}$/;
        return userNameRegex.test(userName);
      },
      message: "Invalid username. Must be 4-20 characters, and contain letters, numbers, hyphens, or underscores.",
    },
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

userSchema.methods.getJWT = function () {
  const user = this;
  return jwt.sign({ email: user.email }, "E-Shopping@123");
};

userSchema.methods.comparePassword = function (loggingPassword) {
  const user = this;
  return bcrypt.compare(loggingPassword, user.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
