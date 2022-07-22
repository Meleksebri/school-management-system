const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["teacher", "student", "parent"],
  },
  classIn: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  profileImage: {
    type: String,
    default:
      "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png",
  },
  subject: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
