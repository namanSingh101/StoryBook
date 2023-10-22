const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: [true, "Google Id not recieved"],
    },
    displayName: {
      type: String,
      required: [true, "Please enter name"],
    },
    firstName: {
      type: String,
      required: [true, "Google Id not recieved"],
    },
    lastName: {
      type: String,
      required: [true, "Google Id not recieved"],
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
      required: [true, "Please enter Email Address"],
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
