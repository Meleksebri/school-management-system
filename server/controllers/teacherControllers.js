const User = require("../models/userModel");
const Classroom = require("../models/classModel");
const Exam = require("../models/examModel");
const Homework = require("../models/homeworkModel");

exports.getTeacherClass = async (req, res) => {
  try {
    const classro = await Classroom.findOne({ subject: req.query.subject });
    if (!classro) return res.status(404).json({ msg: "classroom not found" });
    res.status(200).json({ classro });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

exports.newExam = async (req, res) => {
  try {
    const { name, dateOf, totalMark, subject, classname } = req.body;
    const newExam = await Exam.create({
      name,
      dateOf,
      totalMark,
      subject,
      classname,
    });
    res.status(200).json({ msg: "Exam added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

exports.deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.examId);
    res.status(200).json({ msg: "exam deteted successfully", exam });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find({ subject: req.query.subject });
    res.status(200).json({ msg: "list of classes", exams });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

exports.updateExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.examId, req.body, {
      new: true,
    });
    res.status(200).json({ msg: "Exam updated", exam });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

exports.submitMark = async (req, res) => {
  try {
    const { examname, exammarks } = req.body;
    const exam = await Exam.findOneAndUpdate(
      { name: examname },
      { marks: exammarks },
      {
        new: true,
      }
    );
    res.status(200).json({ msg: "Marks updated", exam });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

exports.newHomework = async (req, res) => {
  try {
    const {
      name,
      dateOf,
      description,
      subject,
      classname,
      optionA,
      optionB,
      optionC,
      optionD,
      correct,
    } = req.body;
    const newHomeWork = await Homework.create({
      name,
      dateOf,
      description,
      subject,
      classname,
      optionA,
      optionB,
      optionC,
      optionD,
      correct,
    });
    res.status(200).json({ msg: "Homework added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

exports.getHomeworks = async (req, res) => {
  try {
    const homeworks = await Homework.find({ subject: req.query.subject });
    res.status(200).json({ homeworks });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

exports.deleteHomework = async (req, res) => {
  try {
    const homework = await Homework.findByIdAndDelete(req.params.homeId);
    res.status(200).json({ msg: "homework deteted successfully", homework });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

exports.updateProfile = async (req, res) => {
  try {
    if (req?.file?.filename) {
      const imagePath = `http://localhost:4000/uploads/${req.file.filename}`;
      const data = {
        ...req.body,
        profileImage: imagePath,
      };
      const user = await User.findByIdAndUpdate(req.params.userId, data, {
        new: true,
      });
      res.status(200).json({ msg: "Profile updated successfully", user });
    } else {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
      });
      res.status(200).json({ msg: "Profile updated successfully", user });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};
