const mongoose = require("mongoose");

const examSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  totalMark: {
    type: Number,
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
  marks: {
    type: Object,
  },
});

module.exports = mongoose.model("exam", examSchema);
