const mongoose = require("mongoose");
const classSchema = mongoose.Schema({
  classesName: {
    required: true,
    type: String,
  },
  students: {
    type: [Object],
  },
  subject: {
    type: [String],
  },
});

module.exports = mongoose.model("class", classSchema);
