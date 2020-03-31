const httpStatus = require("http-status");
const { omit } = require("lodash");
const Message = require("../models/message.model");
const User = require("../models/user.model");
const APIError = require("../utils/APIError");
const multer = require("multer");
const uuidv4 = require("uuid/v4");
const {staticUrl} = require('../../config/vars')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const storagePhoto = require('../utils/storagePhoto')


const getPhotoPath = (images, basePath)=>{
  if(!images || !images.length < 0) return null;
  const tempImages = [];
  images.forEach(item => tempImages.push(basePath + item));
  return tempImages;
}

/**
 * Load message and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const message = await Message.get(id);
    req.locals = { message };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get message
 * Lấy nhưng danh sách những tin nhắn cho receiver 
 * @public
 */
exports.get = async (req, res) => {
    let senderId = req.user.id;
    let receiverId = req.params.receiverId;
    let receiverInfo = await User.findById(receiverId);
    let responsceList = [];
    const messages = await Message.get({ senderId, receiverId });
    messages.forEach(message=>{
        let tempMessage = {...message.transform()};
        tempMessage.images = getPhotoPath(message.images, staticUrl);
        
        responsceList.push(tempMessage);
    })
    res.json({
      receiver: receiverInfo.transform(),
      messages: responsceList.reverse()
    });
};

/**
 * Create new message
 * Gửi tin nhắn cho bạn bè 
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const sender = req.user.id;
    let conversationId = [sender, req.body.receiver].sort().join(".");
    const message = new Message({ ...req.body, sender, conversationId });
    let savedMessage = await message.save();
    savedMessage = await savedMessage
      .populate("receiver", "id picture lastname firstname")
      .populate("sender", "id picture lastname firstname")
      .execPopulate();
    savedMessage.images = getPhotoPath(savedMessage.images, staticUrl);
    res.status(httpStatus.CREATED);
    res.json({...savedMessage.transform()});
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing message
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    // check user exists
    const messageUser = await User.get(req.query.user);
    const currentUser = req.user;

    // check message exists
    const message = await Message.findOne({
      $or: [
        {
          $and: [{ userId: currentUser.id }, { messageId: messageUser.id }]
        },
        {
          $and: [{ userId: messageUser.id }, { messageId: currentUser.id }]
        }
      ]
    });

    if (message) {
      message.status = true;
      const savedMessage = await message.save();
      res.status(httpStatus.CREATED);
      res.json(savedMessage.transform());
    } else {
      throw new APIError({
        message: "Message does not exist",
        status: httpStatus.BAD_REQUEST
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Get message list
 * Lấy danh sách những tin nhắn gần nhất
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    let sender = req.user._id;
    // L
    let messages = await Message.list({userId:sender})
    res.json(messages.reverse());
  } catch (error) {
    next(error);
  }
};

/**
 * Delete message
 * @public
 */
exports.remove = async (req, res, next) => {
  try {
    // check user exists
    const messageUser = await User.get(req.query.user);
    const currentUser = req.user;

    // check message exists
    const message = await Message.findOne({
      $or: [
        {
          $and: [{ userId: currentUser.id }, { messageId: messageUser.id }]
        },
        {
          $and: [{ userId: messageUser.id }, { messageId: currentUser.id }]
        }
      ]
    });

    if (message) {
      message
        .remove()
        .then(() => res.status(httpStatus.OK).end())
        .catch(e => next(e));
    } else {
      throw new APIError({
        message: "Message does not exist",
        status: httpStatus.BAD_REQUEST
      });
    }
  } catch (error) {
    next(error);
  }
};

let photosUploadFile = multer(storagePhoto).single("photos");

exports.addPhotos = (req, res, next) => {
  photosUploadFile(req, res, async err=>{
    try {
      if (!req.file) {
        throw new APIError({
          message: "Please select a file.",
          status: httpStatus.BAD_REQUEST
        });
      }
      let outputFile = req.file.path + "_b.jpg";

      await sharp(req.file.path)
        .jpeg({ quality: 80 })
        .toFile(outputFile);
      
      // delete old file
      fs.unlinkSync(req.file.path);
      
      let temp = {
        uid: uuidv4(),
        name: req.file.filename,
        path: `/images/message/${req.file.filename}_b.jpg`,
        status: "done",
        response: { status: "success" },
        linkProps: { download: "image" },
        thumbUrl: `${staticUrl}/images/message/${req.file.filename}_b.jpg`
      };
      return res.json(temp);
    } catch (error) {
      next(error);
    }
  })
}
