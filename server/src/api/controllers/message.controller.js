const httpStatus = require("http-status");
const { omit } = require("lodash");
const Message = require("../models/message.model");
const User = require("../models/user.model");
const APIError = require("../utils/APIError");

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
        responsceList.push(tempMessage);
    })
    res.json({
      receiver: receiverInfo.transform(),
      messages: responsceList.reverse()
    });
};

/**
 * Create new message
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
    res.status(httpStatus.CREATED);
    res.json({...savedMessage.transform()});
  } catch (error) {
    next(error);
  }
};

/**
 * Replace existing message
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const { message } = req.locals;
    const newMessage = new Message(req.body);
    const ommitRole = message.role !== "admin" ? "role" : "";
    const newMessageObject = omit(newMessage.toObject(), "_id", ommitRole);

    await message.updateOne(newMessageObject, { override: true, upsert: true });
    const savedMessage = await Message.findById(message._id);

    res.json({ ...savedMessage.transform()});
  } catch (error) {
    next(Message.checkDuplicateEmail(error));
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
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    let sender = req.user._id;

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
