const {
  register,
  login,
  getUserData,
} = require("../controllers/userControllers");

const { body, validationResult } = require("express-validator");
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/register",
  body("email", "not a valid email").isEmail(),
  register
);
router.post("/login", login);
router.get("/", authMiddleware, getUserData);

module.exports = router;
