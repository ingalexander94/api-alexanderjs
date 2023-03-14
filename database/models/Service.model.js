const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 100,
  },
  icon: {
    type: String,
    required: true,
    maxlength: 30,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = model("Service", serviceSchema);
