const userModel = require("../models/user");
const bcrypt = require("bcryptjs");

//registering new user
const registerUser = async (req, res) => {
  const { password, ...others } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedpassword = bcrypt.hashSync(password, salt);
  const newUser = new userModel({ ...others, password: hashedpassword });
  try {
    await newUser.save();
    res.json({ message: "user creation successful" });
  } catch (error) {
    res.json(error.message);
  }
};

//user login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userInfo = await userModel.findOne({ email });
    if (!userInfo) {
      return res.json({ message: "user does not exists" });
    }
    const verify = bcrypt.compareSync(password, userInfo.password);
    if (!verify) {
      return res.json({ message: "invalid credentials" });
    }
    res.json(userInfo);
  } catch (error) {
    res.json(error.message);
  }
};
module.exports = {
  registerUser,
  login,
};
