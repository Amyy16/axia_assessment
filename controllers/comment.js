const commentModel = require("../models/comment");
const postModel = require("../models/post");

//create a comment
const makeComment = async (req, res) => {
  const { comment, postId } = req.body;
  const { id } = req.user;
  try {
    const newComment = new commentModel({ comment, creatorId: id, postId });
    const savedComment = await newComment.save();
    //modify the post comment field
    await postModel.findByIdAndUpdate(postId, {
      $push: { comments: savedComment.id },
    });
    res.json({ msg: "comment created successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

//get single comment
const getComment = async (req, res) => {
  const { commentId } = req.query;
  try {
    const oneComment = await commentModel
      .findById(commentId)
      .populate({ path: "userId", select: "username email gender" })
      .populate({ path: "postId", select: "title desc" });
    res.json(oneComment);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//get all comments
const getallComments = async (req, res) => {
  try {
    const allcomments = await postModel
      .find()
      .populate({ path: "userId", select: "username email gender" })
      .populate({ path: "postId", select: "title desc" });
    res.json(allcomments);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { makeComment, getComment, getallComments };
