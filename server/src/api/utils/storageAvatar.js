const multer = require("multer");
const uuidv4 = require("uuid/v4");
const path = require("path");
const { avatarTypes, avatarDirectory, avatarLimitSize } = require("../../config/vars");
module.exports = {
  storage: new multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, avatarDirectory);
    },
    filename: (req, file, callback) => {
      let math = avatarTypes;
      if (math.indexOf(file.mimetype) === -1) {
        return callback("Only .png, .jpg and .jpeg format allowed!", null);
      }
      let avatarName = `${Date.now()}-${uuidv4()}-${file.originalname}`;
      callback(null, avatarName);
    },
  }),
  limits: { fileSize: avatarLimitSize },
};
