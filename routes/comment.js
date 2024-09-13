const express = require("express");
const routes = express.Router();
const { makeComment, getComment } = require("../controllers/comment");
const { verify } = require("jsonwebtoken");

routes.post("/comment", verify, makeComment);
routes.get("/comment", getComment);

module.exports = routes;
