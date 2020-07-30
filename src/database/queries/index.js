const ImageUploaded = require("../../models/Image.model");

const getListImage = async () => await ImageUploaded.find({});

module.exports = {
  getListImage,
};
