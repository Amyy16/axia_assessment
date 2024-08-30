const express = require("express");
const routes = express.Router();
const {
  makePost,
  getPosts,
  singlePost,
  likePost,
} = require("../controllers/post");

routes.post("/post", makePost);
routes.get("/post", getPosts);
routes.get("/post/:id", singlePost);
routes.post("/likes", likePost);
module.exports = routes;
