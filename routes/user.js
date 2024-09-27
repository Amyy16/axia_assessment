const express = require("express");
const routes = express.Router();
const {
  registerUser,
  login,
  logoutUser,
  oauthRegister,
  deleteUser,
} = require("../controllers/user");
const { verify } = require("../middleware/verify");

routes.post("/register", registerUser);
routes.post("/oauth", oauthRegister);
routes.post("/login", login);
routes.post("/logout", verify, logoutUser);
routes.delete("/delete-user", verify, deleteUser);

module.exports = routes;
