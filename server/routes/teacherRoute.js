const {
  getTeacherClass,
  newExam,
  getExams,
  deleteExam,
  updateExam,
  submitMark,
  getHomeworks,
  newHomework,
  deleteHomework,
  updateProfile,
} = require("../controllers/teacherControllers");
const express = require("express");
const multer = require("multer");
const { makePredictions } = require("../middlewares/personDetectMiddleware");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/myclass", getTeacherClass);
router.post("/newexam", newExam);
router.get("/allexams", getExams);
router.delete("/deleteExam/:examId", deleteExam);
router.put("/updateexam/:examId", updateExam);
router.put("/submitmarks", submitMark);

router.get("/allhomeworks", getHomeworks);
router.post("/newhomework", newHomework);
router.delete("/delete/:homeId", deleteHomework);
router.put(
  "/update/:userId",
  [upload.single("image"), makePredictions],
  updateProfile
);
module.exports = router;
