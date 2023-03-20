// Requiring mongoose and validator
const mongoose = require("mongoose");
const validator = require("validator");

// Defining a Schema
const userSchema = mongoose.Schema({
  // name,email,password,phone,message I am following this as this the most normal
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new error("Invalid Email format");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    minLength: 10,
  },
  message: {
    type: String,
    required: true,
    minLength: 3,
  },
});
// Schema/Rules for filling the form are over here

// Now we create a collection using=>
// const User=mongoose.model("Singular Name",Schema it follows) name changes automatically to plural
const User = mongoose.model("User", userSchema);

// Now we export the User
User.createIndexes();
module.exports = User;
