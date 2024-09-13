const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    postId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "post",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("comment", commentSchema);
module.exports = commentModel;
