const httpStatus = require("http-status");
const { omit } = require("lodash");
const Message = require("../models/message.model");
const ChatGroup = require("../models/chatGroup.model");
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
const _ = require("lodash");
const logger = require("../../config/logger");

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
exports.get = async (req, res, next) => {
  try {
    let senderId = req.user.id;
    let receiverId = req.params.receiverId;
    let { skip, limit } = req.query;
    let receiverInfo = await User.findById(receiverId);
    let responsceList = [];
    let responeData = {};

    if (!receiverInfo) {
      // Tìm id hiện tại có phải là group chat hay không
      receiverInfo = await ChatGroup.findById(receiverId);
      // Nếu không phải group chat thì trả về lỗi không tìm thấý
      if (!receiverInfo || !receiverInfo.members.includes(req.user.id)) {
        throw new APIError({
          message: "Not found",
          status: httpStatus.BAD_REQUEST,
        });
      }

      // Lấy danh sách cuộc trò chuyện
      const groupMessages = await Message.getGroup({
        groupId: receiverInfo.id,
        skip,
        limit,
      });

      // Lấy thông tin của admin
      let admin = await User.findById(receiverInfo.admin);

      // Lấy thông tin members
      let members = await User.find({
        _id: { $in: receiverInfo.members },
      });
      members = members.map((member) => {
        let tempMember = {
          id: member.id,
          firstname: member.firstname,
          lastname: member.lastname,
          picture: member.picture,
        };
        if (member.id === receiverInfo.admin) {
          tempMember.admin = true;
        }
        return tempMember;
      });

      // Transform kết quả trả về
      responsceList = await groupMessages.map((message) => message.transform());
      responeData.conversationType = "ChatGroup";
      responeData.receiver = {
        id: receiverInfo.id,
        picture: receiverInfo.picture,
        name: receiverInfo.name,
        members,
      };
    } else {
      // personal chat
      const personalMessages = await Message.getPersonal({
        senderId,
        receiverId,
        skip,
        limit,
      });
      responsceList = await personalMessages.map((message) =>
        message.transform()
      );
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
  } catch (error) {
    next(error);
  }
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
    let conversationId = null;
    if (conversationType === "ChatGroup") {
      // check group có tồn tại không? 
      const group = await ChatGroup.findById(req.body.receiver);

      // check user hiện tại có phải là member hay không?
      if (group && group.members.includes(req.user.id))
        conversationId = req.body.receiver;
     
    } else if (conversationType === "User") {
      // check người dùng tồn tại hay không 
      const user = await User.findById(req.body.receiver);
      if(user)conversationId = [sender, req.body.receiver].sort().join(".");
    }

    if (!conversationId){
      // Nếu không tồn tại users hay group => return lỗi 
       throw new APIError({
         message: "Something went wrong",
         status: httpStatus.BAD_REQUEST,
       });
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
    let personalMessages = await Message.listPersonal({ userId: sender, skip: req.query.pskip });

    // Lấy danh sách chat nhóm
    let groupMessages = await ChatGroup.list({
      userId: [sender.toString()],
      skip: req.query.gskip,
    });
    let groupMessagesPromise = groupMessages.map(async (item) => {
      let tempItem = {
        receiver: {
          _id: item.id,
          name: item.name,
          picture: item.picture,
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
    });

    let personalMessagesResponse = await Promise.all(groupMessagesPromise);
    let messages = personalMessages.concat(personalMessagesResponse);

    res.json(
      _.sortBy(messages, (item) => {
        return -item.updatedAt;
      })
    );
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
        message: err,
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

let filesUpload = multer(storageFile).single("files");

exports.addFiles = (req, res, next) => {
  filesUpload(req, res, async (err) => {
    try {
      if (!req.file) {
      console.log(err);
      throw new APIError({
        message: err,
        status: httpStatus.BAD_REQUEST,
      });
      }

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

exports.imagesList = async (req, res, next) => {
  try {
    let { id, skip, limit } = req.query;
    // Kiểm tra xem id hiện tại có phải là User hay không.
    let isUser = await User.findById(id);
    let conversationId = null;
    if (isUser) {
      conversationId = [id, req.user._id].sort().join(".");
    } else {
      // Kiểm tra xem id có phải của group chat hay không
      let isGroupChat = await ChatGroup.findById(id);
      if (isGroupChat) {
        conversationId = id;
      }
    }

    // Nếu không tồn tại Id return lỗi Not Found
    if (!conversationId) {
      throw new APIError({
        message: "Not found.",
        status: httpStatus.NOT_FOUND,
      });
    }

    let images = await Message.imagesList({ conversationId, limit, skip });
    images = images[0] ? images[0].list : [];
    return res.json({ images });
  } catch (error) {
    next(error);
  }
};

exports.filesList = async (req, res, next) => {
  try {
    let { id, skip, limit } = req.query;
    // Kiểm tra xem id hiện tại có phải là User hay không.
    let isUser = await User.findById(id);
    let conversationId = null;
    if (isUser) {
      conversationId = [id, req.user._id].sort().join(".");
    } else {
      // Kiểm tra xem id có phải của group chat hay không
      let isGroupChat = await ChatGroup.findById(id);
      if (isGroupChat) {
        conversationId = id;
      }
    }

    // Nếu không tồn tại Id return lỗi Not Found
    if (!conversationId) {
      throw new APIError({
        message: "Not found.",
        status: httpStatus.NOT_FOUND,
      });
    }

    let files = await Message.filesList({ conversationId, limit, skip });
    files = files[0] ? files[0].list : [];
    return res.json({ files });
  } catch (error) {
    next(error);
  }
};
