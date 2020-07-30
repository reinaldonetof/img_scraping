const ImageUploaded = require("../../models/Image.model");

const createImage = async (image) => await ImageUploaded.create(image);

module.exports = {
  createImage,
};
