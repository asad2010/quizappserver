const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    role: {
      default: 100,
      enum: [120, 1], 
    },
    profilePicture: {
      type: Object,
      default: "",
    },
  }
)

module.exports = mongoose.model("User", UserSchema)