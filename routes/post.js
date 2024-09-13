const express = require("express");
const routes = express.Router();
const {
  makePost,
  getPosts,
  singlePost,
  likePost,
} = require("../controllers/post");
const { verify } = require("../middleware/verify");

routes.post("/post", verify, makePost);
routes.get("/post", getPosts);
routes.get("/post/:id", singlePost);
routes.put("/likes", verify, likePost);
module.exports = routes;
