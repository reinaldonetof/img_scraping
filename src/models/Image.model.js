const mongoose = require("mongoose");

const ImageUploadedSchema = {
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
  },
  link: {
    type: String,
  },
};

const ImageUploaded = mongoose.model("ImageUploaded", ImageUploadedSchema);

module.exports = ImageUploaded;
