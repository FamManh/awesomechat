const multer = require('multer')
const uuidv4 = require("uuid/v4");
const path = require("path");
const {photoDirectory, photoTypes} = require('../../config/vars')
module.exports = {
  storage: new multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, photoDirectory);
    },
    filename: (req, file, callback) => {
      let math = photoTypes;
      if (math.indexOf(file.mimetype) === -1) {
        return callback("Error", null);
      }
      let imageName = `${Date.now()}-${uuidv4()}`;
    //   .${file.originalname.split(".").pop()}
      callback(null, imageName);
    }
  })
};
