const multer = require("multer");
const uuidv4 = require("uuid/v4");
const path = require("path");
const { fileDirectory, fileTypes } = require("../../config/vars");
module.exports = {
  storage: new multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, fileDirectory);
    },
    filename: (req, file, callback) => {
        console.log(file)
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        callback(null, uniqueSuffix + "-" + file.originalname );
    },
  }),
};
