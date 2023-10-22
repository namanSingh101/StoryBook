const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title"],
      trim:true
    },
    body: {
      type: String,
      required: [true, "Please enter name"],
    },
    status: {
      type: String,
      default:"public",
      enum:["private","public"]
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: [true, "User Id not provided"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Story", StorySchema);
