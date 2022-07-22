const express = require("express");
const {
  studentClass,
  getTeachers,
  getHomeworks,
  getExams,
} = require("../controllers/studentControllers");
const router = express.Router();

router.get("/getStudentClass", studentClass);
router.get("/teachers", getTeachers);
router.get("/homework", getHomeworks);
router.get("/exam", getExams);
module.exports = router;
