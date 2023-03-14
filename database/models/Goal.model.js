const { Schema, model } = require("mongoose");

const goalSchema = new Schema({
  role: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
  },
  institution: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 100,
  },
  type: {
    type: String,
    required: true,
  },
});

module.exports = model("Goal", goalSchema);
