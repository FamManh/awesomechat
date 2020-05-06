const httpStatus = require("http-status");
const { omit } = require("lodash");
const ChatGroup = require("../models/chatGroup.model");
const Message = require("../models/message.model");
const User = require("../models/user.model");
const APIError = require("../utils/APIError");
const storageAvatar = require("../utils/storageAvatar");
const fsExtra = require("fs-extra");
const multer = require("multer");
const _ = require("lodash");
const {avatarDirectory} = require('../../config/vars')
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
    
    let members = [...req.body.members, req.user.id]
    members = [...new Set(members)];
    if(members.length < 3){
      throw new APIError({
        message: "Must be at least 3 people",
        status: httpStatus.BAD_REQUEST,
      });
    }

    // Check group exists
    const groupExists = await ChatGroup.findOne({"$and": [
      {members: {"$all": members}},
      {members: {"$size": members.length}}
    ]})
    
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

    await chatGroup.save();
    
    res.status(httpStatus.CREATED);
    res.json({ ...chatGroup.transform(), admin: {id: req.user.id, firstname: req.user.firstname, lastname: req.user.lastname, picture: req.user.picture} });
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
    let {id, name} = req.body
    const currentUser = req.user
    // check user exists
    const group = await ChatGroup.findById(id);

    // Nếu không tim thấy group thì đẩy lỗi về
    if (!group) {
      throw new APIError({
        message: "ChatGroup does not exist",
        status: httpStatus.BAD_REQUEST,
      });
    }
    if (group.members.includes(currentUser.id)) {
      // Nếu người dùng hiện tại là members thif cho update
      group.name = name;
      await group.save();
      return res.status(httpStatus.OK).json(group.transform());
    }
    // Nếu người dùng hiện tại không phải là admin đẩy lỗi về
    throw new APIError({
      message: "Something went wrong",
      status: httpStatus.BAD_REQUEST,
    });
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

exports.removeMember = async(req, res, next) => {
  try{
    let groupId = req.query.group;
    let userId = req.query.user;
    let currentUser = req.user;
    const group = await ChatGroup.findById(groupId);

    // Nếu không tim thấy group thì đẩy lỗi về 
    if(!group){
      throw new APIError({
        message: 'ChatGroup does not exist',
        status: httpStatus.BAD_REQUEST
      })
    }
    if (group.admin === currentUser.id || currentUser.id === userId) {
      // Nếu người dùng hiện tại là admin hoặc người dùng hiện tại là chính họ thì xóa 
      group.members.remove(userId);
      await group.save();
      return res.status(httpStatus.OK).end();
    }
    // Nếu người dùng hiện tại không phải là admin đẩy lỗi về 
      throw new APIError({
        message: 'Something went wrong',
        status: httpStatus.BAD_REQUEST
      })
  }catch(error){
    next(error);
  }
}

exports.addMember = async (req, res, next) => {
  try {
    let {members, groupId} = req.body;
    let currentUser = req.user;
    const group = await ChatGroup.findById(groupId);
    // Nếu không tim thấy group thì đẩy lỗi về
    if (!group) {
      throw new APIError({
        message: "ChatGroup does not exist",
        status: httpStatus.BAD_REQUEST,
      });
    }

    if (group.members.includes(currentUser.id)) {
      // Nếu người dùng hiện tại là 1 trong những members
      await ChatGroup.findOneAndUpdate(
        { _id: groupId },
        {
          $addToSet: { members },
        }
      );
      return res.status(httpStatus.OK).end();
    }
    // Nếu người dùng hiện tại không phải là members 
    throw new APIError({
      message: "Something went wrong",
      status: httpStatus.BAD_REQUEST,
    });
  } catch (error) {
    next(error);
  }
};


let avatarUploadFile = multer(storageAvatar).single("avatar");

exports.updateAvatar = (req, res, next) => {
  avatarUploadFile(req, res, async (err) => {
    try {
      if (!req.file) {
        throw new APIError({
          message: "Please select a file.",
          status: httpStatus.BAD_REQUEST,
        });
      }

      // update user
      let chatGroupUpdate = await ChatGroup.findOneAndUpdate(
        { _id: req.params.chatGroupId },
        { picture: req.file.filename }
      );
      // Delete old user picture
      if (chatGroupUpdate.picture) {
        await fsExtra.remove(`${avatarDirectory}/${chatGroupUpdate.picture}`); // return old item after updated
      }

      let result = {
        message: "success",
        picture: `${req.file.filename}`,
      };
      return res.send(result);
    } catch (error) {
      next(error);
    }
  });
};

