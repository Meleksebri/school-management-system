const mongoose = require("mongoose");
const homeworkSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateOf: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  classname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  optionA: {
    type: String,
    required: true,
  },
  optionB: {
    type: String,
    required: true,
  },
  optionC: {
    type: String,
    required: true,
  },
  optionD: {
    type: String,
    required: true,
  },
  correct: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("homework", homeworkSchema);
