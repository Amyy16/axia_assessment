const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    creatorId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
    },
    likes: {
      type: [mongoose.Types.ObjectId],
      default: [],
      ref: "user",
    },
    comment: {
      type: [mongoose.Types.ObjectId],
      default: [],
      ref: "comment",
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model("post", postSchema);
module.exports = postModel;
