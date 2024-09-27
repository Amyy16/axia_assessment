const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//registering new user
const registerUser = async (req, res) => {
  try {
    const { password, ...others } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = bcrypt.hashSync(password, salt);
    const newUser = new userModel({ ...others, password: hashedpassword });
    await newUser.save();
    res.status(200).json({ message: "user creation successful" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//user login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userInfo = await userModel.findOne({ email });
    if (!userInfo) {
      return res.status(400).json({ message: "user does not exists" });
    }
    const verify = bcrypt.compareSync(password, userInfo.password);
    if (!verify) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    const aboutUser = { id: userInfo.id };
    const token = jwt.sign(aboutUser, process.env.JWT_SECRET);
    res
      .cookie("user_token", token)
      .status(200)
      .json({ message: "login successful" });
  } catch (error) {
    res.json(error.message);
  }
};

//logout a user
const logoutUser = async (req, res) => {
  try {
    res
      .clearCookie("user_token")
      .status(200)
      .json({ message: "user logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//oauth registration and login
const oauthRegister = async (req, res) => {
  const { username, email, gender } = req.body;
  try {
    //check if account exist and it is credential account
    const findOne = await userModel.findOne({ email });
    if (findOne && findOne.credentialAccount) {
      return res.status(400).json({ message: "illegal parameters" });
    }
    //find account and login
    if (findOne) {
      const aboutUser = { id: findOne.id, role: findOne.role };
      const token = jwt.sign(aboutUser, process.env.JWT_SECRET);
      res.cookie("user_token", token);
      return res.status(200).json({ message: "login successful" });
    }
    //creating a new user and logging in
    const newUser = new userModel({
      username,
      email,
      gender,
      credentialAccount: false,
    });
    const savedUser = await newUser.save();
    const aboutUser = { id: savedUser.id, role: savedUser.role };
    const token = jwt.sign(aboutUser, process.env.JWT_SECRET);
    res
      .cookie("user_token", token)
      .status(200)
      .json({ message: "registration successful" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//delete a user
const deleteUser = async (req, res) => {
  const { id } = req.user;
  try {
    await userModel.findOneAndDelete(id);
    res
      .clearCookie("user_token")
      .status(200)
      .json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = {
  registerUser,
  login,
  logoutUser,
  oauthRegister,
  deleteUser,
};
