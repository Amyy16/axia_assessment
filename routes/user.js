const express = require("express");
const routes = express.Router();
const { registerUser, login } = require("../controllers/user");

routes.post("/register", registerUser);
routes.post("/login", login);
module.exports = routes;
