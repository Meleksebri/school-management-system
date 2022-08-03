const User = require("../models/loginModel");
const RequestUser = require("../models/userModel");
const classroom = require("../models/classModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

// nodemailer config
let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "meleksebri25@gmail.com",
    pass: "rdmdhugramdmkiln",
  },
});

// @desc create a new admin account
exports.addNewAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) return res.status(404).json({ msg: "Email already exists" });
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    const newAdmin = await User.create({
      firstName,
      lastName,
      email,
      password : hash,
      role: "admin",
    });
    res.status(200).json({ msg: "new admin has been created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

// @desc add new user
// @params POST /api/v1/users/addUser
// @access PRIVATE
exports.addNewUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role,
      gender,
      classIn,
      subject,
    } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) return res.status(404).json({ msg: "Email already exists" });
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
      role,
    });

    const updatedUser = await RequestUser.findOneAndUpdate(
      { email },
      { isApproved: true, classIn, gender, subject }
    );

    const mailDetails = {
      from: "meleksebri25@gmail.com",
      to: email,
      subject: "Your school account information",
      text: `email : ${email}
      password : ${password}`,
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent successfully");
      }
    });

    if (!updatedUser) {
      var userrNew = await RequestUser.create({
        firstName,
        lastName,
        email,
        role,
        gender,
        classIn,
        phoneNumber,
        subject,
        isApproved: true,
      });
    }
    if (role === "student") {
      const updateClass = await classroom.findOneAndUpdate(
        { classesName: classIn },
        { $push: { students: updatedUser || userrNew } }
      );
    }
    res.json({ msg: "user now approved", updatedUser, newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

// @desc get pended users
// @params GET /api/v1/users/pendedusers
// @access PRIVATE
exports.getPendedUsers = async (req, res) => {
  try {
    const pendedUsers = await RequestUser.find({ isApproved: false });
    if (!pendedUsers) return res.json("no pended user");
    res.status(200).json(pendedUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

// @desc delete pended users
// @params DELETE /api/v1/users/deletependedusers
// @access PRIVATE
exports.deletePendedUsers = async (req, res) => {
  try {
    const deletedUser = await RequestUser.findOneAndDelete(req.params.userId);
    res.status(200).json({ msg: "user request deleted", deletedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

// !! user related api

// @desc get all students
// @params GET /api/v1/students
// @access PRIVATE
exports.getAllStudents = async (req, res) => {
  try {
    const students = await RequestUser.find({
      isApproved: true,
      role: "student",
    });
    res.status(200).json({ msg: "list of the students", students });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

// @desc get all teachers
// @params GET /api/v1/teachers
// @access PRIVATE
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await RequestUser.find({
      isApproved: true,
      role: "teacher",
    });
    res.status(200).json({ msg: "list of the teachers", teachers });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

// @desc get all parents
// @params GET /api/v1/parents
// @access PRIVATE
exports.getAllParents = async (req, res) => {
  try {
    const parents = await RequestUser.find({
      isApproved: true,
      role: "parent",
    });
    res.status(200).json({ msg: "list of the students", parents });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

// @desc get one user
// @params GET /api/v1/user/:userId
// @access PRIVATE
exports.getUser = async (req, res) => {
  try {
    const user = await RequestUser.findById(req.params.userId);
    res.status(200).json({ msg: "user found", user });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

// @desc delete one user
// @params DELETE /api/v1/user/delete/:userId
// @access PRIVATE
exports.deleteUser = async (req, res) => {
  try {
    const user = await RequestUser.findByIdAndDelete(req.params.userId);
    const userlogin = await User.findOneAndDelete({ email: user.email });
    res.status(200).json({ msg: "user deteted successfully", user, userlogin });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

// @desc update one user
// @params UPDATE /api/v1/user/update/:userId
// @access PRIVATE
exports.updateUser = async (req, res) => {
  try {
    if (req?.file?.filename) {
      const imagePath = `http://localhost:4000/uploads/${req.file.filename}`;
      const data = {
        ...req.body,
        profileImage: imagePath,
      };
      const user = await RequestUser.findByIdAndUpdate(
        req.params.userId,
        data,
        {
          new: true,
        }
      );
      res.status(200).json({ msg: "user updated", user });
    } else {
      const user = await RequestUser.findByIdAndUpdate(
        req.params.userId,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({ msg: "user updated", user });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

// @desc get number of users
// @params GET /api/v1/admin/number
// @access PRIVATE
exports.getNumberUsers = async (req, res) => {
  try {
    const numberParents = await RequestUser.find({
      isApproved: true,
      role: "parent",
    }).select("-password");

    const numberTeachers = await RequestUser.find({
      isApproved: true,
      role: "teacher",
    }).select("-password");

    const numberStudents = await RequestUser.find({
      isApproved: true,
      role: "student",
    }).select("-password");

    const numberAdmins = await User.find({
      role: "admin",
    }).select("-password");
    res.status(200).json({
      student: numberStudents,
      parent: numberParents,
      admin: numberAdmins,
      teacher: numberTeachers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

// !! class and subject related api
exports.addNewClass = async (req, res) => {
  try {
    const { classesName } = req.body;
    const existClass = await classroom.findOne({ classesName });
    if (existClass)
      return res.status(404).json({ msg: "Class already exists" });
    const newClass = await classroom.create({ classesName });
    res.status(200).json({ msg: "Class added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    const classes = await classroom.find();
    res.status(200).json({ msg: "list of classes", classes });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const classSelected = await classroom.findById(req.params.userId);
    const updateUser = await RequestUser.updateMany(
      { classIn: classSelected.classesName },
      { classIn: "" }
    );
    const classr = await classroom.findByIdAndDelete(req.params.userId);
    res.status(200).json({ msg: "class deteted successfully", classr });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

exports.updateClass = async (req, res) => {
  try {
    const classr = await classroom.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    res.status(200).json({ msg: "class updated", classr });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

exports.assignNewSubject = async (req, res) => {
  try {
    const { classname, subjectName } = req.body;
    const claz = await classroom.findOneAndUpdate(
      { classesName: classname },
      { $push: { subject: subjectName } },
      { new: true }
    );
    res.status(200).json({ msg: "Subject added", claz });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const user = await RequestUser.findOne({ email: req?.query?.email });
    if (!user) return res.status(404).json({ msg: "user not found" });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};
