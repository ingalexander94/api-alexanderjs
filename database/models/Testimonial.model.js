const { Schema, model } = require("mongoose");

const testimonialSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    maxlength: 230,
    required: true,
  },
  socialNetwork: {
    type: String,
    required: true,
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

module.exports = model("Testimonial", testimonialSchema);
