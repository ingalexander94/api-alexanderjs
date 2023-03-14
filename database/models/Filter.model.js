const { Schema, model } = require("mongoose");

const filterSchema = new Schema({
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
});

module.exports = model("Filter", filterSchema);
