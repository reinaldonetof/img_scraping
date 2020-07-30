function manageUrl(arrayImage) {
  const result = arrayImage.map((image) => {
    if (image.src.match(/base64/)) {
      const buf = Buffer.from(
        image.src.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      return {
        type: "image/jpeg",
        alt: image.alt,
        uri: buf,
        encoding: "base64",
      };
    } else {
      if (!image.src.match(/http/)) image.src = `${image.url}${image.src}`;
      return {
        alt: image.alt,
        uri: image.src,
        type: "",
        encoding: "",
      };
    }
  });

  return result;
}

module.exports = manageUrl;
