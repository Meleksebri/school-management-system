const User = require("../models/loginModel");
const Ruser = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// @desc login
// @params POST /api/v1/users/login
// @access PRIVATE

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser)
      return res.status(404).json({ msg: "you should register first" });
    const verifyPassword = await bcrypt.compare(password, existUser.password);
    if (!verifyPassword)
      return res.status(401).json({ msg: "password is incorrect" });

    const token = await jwt.sign(
      { sub: existUser._id },
      process.env.JWT_SECRET
    );
    res.json({ success: true, token, userInfo: existUser });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

// @desc register user
// @params POST /api/v1/users/register
// @access PUBLIC
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, role, phoneNumber } = req.body;
    const existUser = await Ruser.findOne({ email });
    if (existUser) return res.status(404).json({ msg: "email already exists" });

    const newUser = await Ruser.create({
      firstName,
      lastName,
      email,
      role,
      phoneNumber,
    });
    res.json({ msg: "register request sent successfully", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

exports.getUserData = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId }).select("-password");
    if (!user) return res.status(401).json({ msg: "you are not authorized" });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};
