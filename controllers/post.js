const postModel = require("../models/post");

//make a post
const makePost = async (req, res) => {
  const { creatorId, ...others } = req.body;
  const { id } = req.user;
  const newPost = new postModel({ ...others, creatorId: id });
  try {
    await newPost.save();
    res.json({ message: "post created successfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//get all post
const getPosts = async (req, res) => {
  try {
    const allPosts = await postModel
      .find()
      .populate({ path: "creatorId", select: "username email" })
      .populate({ path: "comment", select: "comment userId" });
    res.json(allPosts);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// get single post
const singlePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel
      .findById(id)
      .populate({ path: "creatorId", select: "username email gender" })
      .populate({ path: "comment", select: "comment userId" });
    if (!post) {
      return res.json({ message: "post does not exist" });
    }
    res.json(post);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//liking and disliking a post
const likePost = async (req, res) => {
  const { userid } = req.body;
  const { id } = req.user;
  const post = await postModel.findById(id);
  if (!post) {
    return res.json({ msg: "post does not exist" });
  }
  const gottenlikes = post.likes;
  const includelikes = gottenlikes.includes(userid);
  if (!includelikes) {
    gottenlikes.push(userid);
  } else {
    const index = gottenlikes.indexOf(userid);
    gottenlikes.splice(index, 1);
  }
  try {
    await postModel.findByIdAndUpdate(
      id,
      { likes: gottenlikes },
      { new: true }
    );
    res.json({ msg: "post liked" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { makePost, getPosts, singlePost, likePost };
