const scrapImg = require("../../utils/scrapper");
const uploadImage = require("../../services/multer.service");
const multationsMongo = require("../../database/multations");

async function getUriAndUpload(link, io) {
  const images = await scrapImg(link);
  const imagesUploaded = [];
  let count = 0;
  for await (let image of images) {
    await uploadImage(image, (returnImageUploaded) => {
      if (count == images.length - 1) {
        imagesUploaded.push(returnImageUploaded);
        saveToDatabase(imagesUploaded, io);
      } else {
        count++;
        imagesUploaded.push(returnImageUploaded);
      }
    });
  }
}

async function saveToDatabase(array, io) {
  const arrayFromDb = [];
  for await (let image of array) {
    await multationsMongo.createImage(image).then((value) => {
      arrayFromDb.push(value);
    });
  }
  io.emit("newImagesUploaded", arrayFromDb);
}

module.exports = {
  getUriAndUpload,
  saveToDatabase,
};
