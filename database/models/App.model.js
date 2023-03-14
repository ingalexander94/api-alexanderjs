const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const appSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  nameClient: {
    type: String,
    required: true,
  },
  tools: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 400,
  },
  role: {
    type: String,
    required: true,
  },
  urlDemo: {
    type: String,
  },
  urlRepository: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Filter",
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

appSchema.plugin(mongoosePaginate);

module.exports = model("App", appSchema);
