const User = require("../models/userModel");
const Classroom = require("../models/classModel");
const Exam = require("../models/examModel");
const Homework = require("../models/homeworkModel");

exports.studentClass = async (req, res) => {
  try {
    const classr = await Classroom.findOne({
      classesName: req?.query?.classn,
    });
    console.log(classr);
    if (!classr) return res.status(404).json({ msg: "Classroom not found" });
    res.status(200).json({ classr });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

exports.getTeachers = async (req, res) => {
  try {
    const teacherlist = await User.find({ role: "teacher", isApproved: true });

    res.status(200).json({ teacherlist });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

exports.getHomeworks = async (req, res) => {
  try {
    const homeworkList = await Homework.find({ classname: req?.query?.myclas });
    res.status(200).json({ homeworkList });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

exports.getExams = async (req, res) => {
  try {
    const examlist = await Exam.find({ classname: req?.query?.myclasss });
    res.status(200).json({ examlist });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};
