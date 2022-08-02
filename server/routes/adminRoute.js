const express = require("express");
const multer = require("multer");
const {
  getPendedUsers,
  addNewUser,
  deletePendedUsers,
  getAllStudents,
  updateUser,
  getUser,
  deleteUser,
  getNumberUsers,
  addNewClass,
  getAllClasses,
  deleteClass,
  updateClass,
  assignNewSubject,
  getUserInfo,
  addNewAdmin,
} = require("../controllers/adminControllers");
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

router.post("/newAdmin", addNewAdmin);
router.get("/pendedusers", getPendedUsers);
router.post("/newUser", addNewUser);
router.delete("/deleteUser/:userId", deletePendedUsers);

router.get("/students", getAllStudents);
router.put("/user/update/:userId", upload.single("profile-image"), updateUser);
router.get("/user/view/:userId", getUser);
router.delete("/user/:userId", deleteUser);

router.get("/number", getNumberUsers);

router.post("/newclass", addNewClass);
router.get("/class", getAllClasses);
router.delete("/class/:userId", deleteClass);
router.put("/class/update/:userId", updateClass);

router.post("/newsubject", assignNewSubject);
router.get("/userInfo", getUserInfo);

module.exports = router;
