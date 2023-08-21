const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    group: {type: String},
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 100, // 101 - teacher 102 - admin
      enum: [100, 101, 102] 
    },
    profilePicture: {
      type: Object,
      default: "",
    },
    allow: {type: Boolean, default: false}
  },
  {timestamps: true}
)

module.exports = mongoose.model("User", UserSchema)