const aws = require("aws-sdk");
const request = require("request");

const storageS3 = new aws.S3();

async function uploadImage(image, cb) {
  if (image["encoding"] === "base64") {
    const options = {
      Key: `${image.alt}.jpg`,
      Body: image.uri,
      ContentEncoding: "base64",
      ContentType: "image/jpeg",
      ACL: "public-read",
      Bucket: "imagescraping",
    };
    storageS3.upload(options, function (error, data) {
      if (error) {
        console.log("error downloading image to s3");
      } else {
        console.log("success uploading to s3");
        cb({ link: data.Location, name: image.alt });
      }
    });
  } else {
    const filename = image.uri.split("/")[image.uri.split("/").length - 1];
    const options = {
      uri: image.uri,
      encoding: null,
      ACL: "public-read",
    };
    return request(options, function (error, response, body) {
      if (error || response.statusCode !== 200) {
        console.log("failed to get image");
        console.log(error);
      } else {
        storageS3.upload(
          {
            Body: body,
            Key: filename,
            Bucket: "imagescraping",
            ContentType: `image/jpeg`,
            ACL: "public-read",
          },
          function (error, data) {
            if (error) {
              console.log("error downloading image to s3");
            } else {
              console.log("success uploading to s3");
              cb({ link: data.Location, name: image.alt });
            }
          }
        );
      }
    });
  }
}

module.exports = uploadImage;
