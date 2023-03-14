const { Schema, model } = require("mongoose");

const skillSchema = new Schema({
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
  photo: {
    type: String,
    required: true,
    unique: true,
  },
  public_id: {
    type: String,
    unique: true,
  },
});

module.exports = model("Skill", skillSchema);
