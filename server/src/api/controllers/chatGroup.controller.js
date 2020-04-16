const httpStatus = require("http-status");
const { omit } = require("lodash");
const ChatGroup = require("../models/chatGroup.model");
const Message = require("../models/message.model");
const User = require("../models/user.model");
const APIError = require("../utils/APIError");

/**
 * Load chatGroup and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const chatGroup = await ChatGroup.get(id);
    req.locals = { chatGroup };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get chatGroup
 * @public
 */
exports.get = (req, res) => res.json(req.locals.chatGroup.transform());

/**
 * Get logged in chatGroup info
 * @public
 */
exports.loggedIn = (req, res) => res.json(req.chatGroup.transform());

/**
 * Create new chatGroup
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    
    const members = [...req.body.members, req.user.id]

    // Check group exists
    const groupExists = await ChatGroup.findOne({members: {$all: members}})
    
    // Nếu nhóm đã tồn tại thì trả về ngay cho người dùng 
    if (groupExists){
      return res.json({ ...groupExists.transform() });
    }

    // Tạo nhóm 
    const chatGroup = new ChatGroup({
      ...req.body,
      members,
      admin: req.user.id,
    });

    // create notif created by
    // const notifMessage = new Message({
    //   conversationType: "ChatGroup",
    //   type: "createdBy",
    //   receiver: chatGroup.id,
    //   sender: req.user.id,
    //   conversationId: chatGroup.id,
    // });
    // await notifMessage.save();

    await chatGroup.save();
    
    res.status(httpStatus.CREATED);
    res.json({ ...chatGroup.transform() });
  } catch (error) {
    next(error);
  }
};

/**
 * Replace existing chatGroup
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const { chatGroup } = req.locals;
    const newChatGroup = new ChatGroup(req.body);
    const ommitRole = chatGroup.role !== "admin" ? "role" : "";
    const newChatGroupObject = omit(newChatGroup.toObject(), "_id", ommitRole);

    await chatGroup.updateOne(newChatGroupObject, { override: true, upsert: true });
    const savedChatGroup = await ChatGroup.findById(chatGroup._id);

    res.json(savedChatGroup.transform());
  } catch (error) {
    next(ChatGroup.checkDuplicateEmail(error));
  }
};

/**
 * Update existing chatGroup
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    // check user exists
    const chatGroupUser = await User.get(req.query.user);
    const currentUser = req.user;

    // check chatGroup exists
    const chatGroup = await ChatGroup.findOne({
      $or: [
        {
          $and: [{ userId: currentUser.id }, { chatGroupId: chatGroupUser.id }]
        },
        {
          $and: [{ userId: chatGroupUser.id }, { chatGroupId: currentUser.id }]
        }
      ]
    });
    console.log(chatGroup);
    if (chatGroup) {
      chatGroup.status = true;
      const savedChatGroup = await chatGroup.save();
      res.status(httpStatus.CREATED);
      res.json(savedChatGroup.transform());
    } else {
      throw new APIError({
        message: "ChatGroup does not exist",
        status: httpStatus.BAD_REQUEST
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Get chatGroup list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    let currentUserId = req.user.id;

    // get type
    const type = ["request", "chatGroup", "requestsent"].includes(
      req.query.type.toLowerCase()
    )
      ? req.query.type.toLowerCase()
      : "chatGroup";

    // get conditions
    let options = {};
    if (type === "request") {
      options = {
        $and: [{ status: false }, { chatGroupId: currentUserId }]
      };
    } else if (type === "requestsent") {
      options = {
        $and: [{ status: false }, { userId: currentUserId }]
      };
    } else {
      options = {
        $and: [
          {
            $or: [{ chatGroupId: currentUserId }, { userId: currentUserId }]
          },
          { status: true }
        ]
      };
    }
    const chatGroups = await ChatGroup.find(options)
      .populate("userId", "id firstname lastname email picture createdAt")
      .populate("chatGroupId", "id firstname lastname email picture createdAt");

    // get list users
    let responseList = [];
    chatGroups.forEach(item => {
      if (item.userId.id == currentUserId) {
        responseList.push(item.chatGroupId.transform());
      } else if (item.chatGroupId.id == currentUserId) {
        responseList.push(item.userId.transform());
      }
    });
    res.json(responseList);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete chatGroup
 * @public
 */
exports.remove = async (req, res, next) => {
  try {
    // check user exists
    const chatGroupUser = await User.get(req.query.user);
    const currentUser = req.user;

    // check chatGroup exists
    const chatGroup = await ChatGroup.findOne({
      $or: [
        {
          $and: [{ userId: currentUser.id }, { chatGroupId: chatGroupUser.id }]
        },
        {
          $and: [{ userId: chatGroupUser.id }, { chatGroupId: currentUser.id }]
        }
      ]
    });

    if (chatGroup) {
      chatGroup
        .remove()
        .then(() => res.status(httpStatus.OK).end())
        .catch(e => next(e));
    } else {
      throw new APIError({
        message: "ChatGroup does not exist",
        status: httpStatus.BAD_REQUEST
      });
    }
  } catch (error) {
    next(error);
  }
};
