const express = require("express");
const routes = express.Router();
const {
  makeComment,
  getComment,
  getallComments,
} = require("../controllers/comment");
const { verify } = require("../middleware/verify");

routes.post("/comment", verify, makeComment);
routes.get("/comment", getComment);
routes.get("/allcomments", getallComments);

module.exports = routes;
