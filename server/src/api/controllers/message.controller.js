const httpStatus = require("http-status");
const { omit } = require("lodash");
const Message = require("../models/message.model");
const ChatGroup = require("../models/chatGroup.model")
const User = require("../models/user.model");
const APIError = require("../utils/APIError");
const multer = require("multer");
const uuidv4 = require("uuid/v4");
const { staticUrl } = require("../../config/vars");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const storagePhoto = require("../utils/storagePhoto");
const storageFile = require("../utils/storageFile");
const _ = require('lodash')
const logger = require('../../config/logger')

const getPhotoPath = (images, basePath) => {
  if (!images || !images.length < 0) return null;
  const tempImages = [];
  images.forEach((item) => tempImages.push(basePath + item));
  return tempImages;
};

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
  let responeData = {}

  if(!receiverInfo){
    // Tìm id hiện tại có phải là group chat hay không 
    receiverInfo = await ChatGroup.findById(receiverId);

    // Nếu không phải group chat thì trả về lỗi không tìm thấý 
    if (!receiverInfo) {
      return res.status(httpStatus.NOT_FOUND).json({erro: "Not found"})
    }

    // Lấy danh sách cuộc trò chuyện 
    const groupMessages = await Message.getGroup({ groupId: receiverInfo.id });
    
    // Transform kết quả trả về
    responsceList = await groupMessages.map((message) => message.transform());
    responeData.conversationType = "ChatGroup";
    responeData.receiver = {
      id: receiverInfo.id,
      picture: receiverInfo.picture,
      name: receiverInfo.name,
      members: receiverInfo.members,
    };

  }else{
    // personal chat
    const personalMessages = await Message.getPersonal({ senderId, receiverId });
    responsceList = await personalMessages.map((message) => message.transform());
    responeData.conversationType = "User";
    responeData.receiver = {
      picture: receiverInfo.picture,
      firstname: receiverInfo.firstname,
      lastname: receiverInfo.lastname,
      id: receiverInfo.id,
      
    };
  }
  
  responeData.messages = responsceList.reverse();
  res.json(responeData);
};

/**
 * Create new message
 * Gửi tin nhắn cho bạn bè
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const sender = req.user.id;
    const { conversationType } = req.body;
    // Nếu tin nhắn group thì conversation id = group id
    let conversationId = [sender, req.body.receiver].sort().join(".")
    if(conversationType === "ChatGroup"){
      conversationId = req.body.receiver;
    }

    const message = new Message({ ...req.body, sender, conversationId });
    let savedMessage = await message.save();

    savedMessage = await savedMessage
      .populate("receiver", "id picture lastname firstname name members")
      .populate("sender", "id picture lastname firstname")
      .execPopulate();
    res.status(httpStatus.CREATED);
    res.json({ ...savedMessage.transform() });
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
          $and: [{ userId: currentUser.id }, { messageId: messageUser.id }],
        },
        {
          $and: [{ userId: messageUser.id }, { messageId: currentUser.id }],
        },
      ],
    });

    if (message) {
      message.status = true;
      const savedMessage = await message.save();
      res.status(httpStatus.CREATED);
      res.json(savedMessage.transform());
    } else {
      throw new APIError({
        message: "Message does not exist",
        status: httpStatus.BAD_REQUEST,
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
    let currentUserId = req.user._id;

    let personalMessages = await Message.listPersonal({ userId: sender })
    let groupMessages = await ChatGroup.list({
      userId: [sender.toString()],
    });
    let groupMessagesPromise = groupMessages.map(async item=>{

      let tempItem = {
        receiver: {
          _id: item.id,
          name: item.name,
        },
        message: "",
        sender: "",
        type: "",
        conversationType: "ChatGroup",
        updatedAt: item.updatedAt,
      };
      let lastMessage = await Message.find({ receiver: item.id })
        .populate("sender", "firstname lastname")
        .sort({ updatedAt: -1 })
        .limit(1);
      if (lastMessage.length && lastMessage.length > 0) {
        tempItem.message = lastMessage[0].message;
        tempItem.sender = lastMessage[0].sender;
        tempItem.type = lastMessage[0].type;
        tempItem.conversationType = lastMessage[0].conversationType;
        tempItem.updatedAt = lastMessage[0].updatedAt;
      } 
      
      return tempItem;
    })

    let personalMessagesResponse = await Promise.all(groupMessagesPromise);
    let messages = personalMessages.concat(personalMessagesResponse);
    
    res.json(_.sortBy(messages, item=>{
      return -item.updatedAt;
    }));
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
          $and: [{ userId: currentUser.id }, { messageId: messageUser.id }],
        },
        {
          $and: [{ userId: messageUser.id }, { messageId: currentUser.id }],
        },
      ],
    });

    if (message) {
      message
        .remove()
        .then(() => res.status(httpStatus.OK).end())
        .catch((e) => next(e));
    } else {
      throw new APIError({
        message: "Message does not exist",
        status: httpStatus.BAD_REQUEST,
      });
    }
  } catch (error) {
    next(error);
  }
};

let photosUploadFile = multer(storagePhoto).single("photos");

exports.addPhotos = (req, res, next) => {
  photosUploadFile(req, res, async (err) => {
    try {
      
      if (!req.file) {
        console.log(err);
        throw new APIError({
          message: "Please select a file.",
          status: httpStatus.BAD_REQUEST,
        });
      }
      let outputFile = req.file.path + ".jpg";

      await sharp(req.file.path).jpeg({ quality: 80 }).toFile(outputFile);

      // delete old file
      fs.unlinkSync(req.file.path);

      let temp = {
        uid: uuidv4(),
        name: `${req.file.filename}.jpg`,
        path: `/images/message/${req.file.filename}.jpg`,
        status: "done",
        response: { status: "success" },
        linkProps: { download: "image" },
        thumbUrl: `${staticUrl}/images/message/${req.file.filename}.jpg`,
      };
      return res.json(temp);
    } catch (error) {
      next(error);
    }
  });
};

let filesUpload = multer(storageFile).single('files');

exports.addFiles = (req, res, next) => {
  filesUpload(req, res, async (err) => {
    try {
      
      if (!req.file) {
        console.log(err);
        throw new APIError({
          message: "Please select a file.",
          status: httpStatus.BAD_REQUEST,
        });
      }
      // let outputFile = req.file.path + "_b.jpg";

      // await sharp(req.file.path).jpeg({ quality: 80 }).toFile(outputFile);

      // delete old file
      // fs.unlinkSync(req.file.path);

      let temp = {
        uid: uuidv4(),
        name: req.file.filename,
        path: `/files/${req.file.filename}`,
        status: "done",
        response: { status: "success" },
        linkProps: { download: "file" },
      };
      return res.json(temp);
    } catch (error) {
      next(error);
    }
  });
};

