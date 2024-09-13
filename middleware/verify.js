const jwt = require("jsonwebtoken");
const verify = (req, res, next) => {
  const { user_token } = req.cookies;
  if (!user_token) {
    return res.json({ msg: "you're not logged in" });
  }
  jwt.verify(user_token, process.env.JWT_SECRET, (error, info) => {
    if (error) {
      return res.json({ message: "invalid token" });
    }
    req.user = info;
    next();
  });
};
module.exports = { verify };
