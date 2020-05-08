const httpStatus = require("http-status");
const { omit } = require("lodash");
const User = require("../models/user.model");
const Contact = require("../models/contact.model");
const _ = require("lodash");
const uuidv4 = require("uuid/v4");
const multer = require("multer");
const fsExtra = require("fs-extra");
const APIError = require("../utils/APIError");
const storageAvatar = require('../utils/storageAvatar')
const ICETurnServer = require('../../config/ICETurnServer')
const {
  avatarDirectory,
  avatarTypes,
  avatarLimitSize,
} = require("../../config/vars");
/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const user = await User.get(id);
    req.locals = { user };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get user
 * @public
 */
exports.get = (req, res) => res.json(req.locals.user.transform());

exports.getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  return res.json(user.transform());
};

/**
 * Get logged in user info
 * @public
 */
exports.loggedIn = (req, res) => res.json(req.user.transform());

/**
 * Update existing user
 * @public
 */
exports.update = async (req, res, next) => {
  let user = await User.get(req.user.id);
  // const ommitRole = user.role !== "admin" ? "role" : "";
  // const ommitPassword = req.body.password !== "admin" ? "role" : "";

  const updatedUser = omit(req.body, ["role", "password"]);
  user = Object.assign(user, updatedUser);
  user
    .save()
    .then((savedUser) => res.json(savedUser.transform()))
    .catch((e) => next(User.checkDuplicateUsername(e)));
};

/**
 * Update existing user
 * @public
 */
exports.updatePassword = async (req, res, next) => {
  try {
    let user = await User.get(req.user.id);
    const { oldPassword, newPassword } = req.body;
    const passwordMatch = await user.passwordMatches(oldPassword);
    if (passwordMatch) {
      user = Object.assign(user, { password: newPassword });
      return user
        .save()
        .then(() => res.json({message: "update succesfully"}))
        .catch((e) => next(e));
    }
    throw new APIError({
      message: "Passwords don't match",
      status: httpStatus.NOT_FOUND,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get user list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    // search user to add contact
    let currentUserId = req.user.id;
    let users = await User.list({ ...req.query });
    // get userids list
    let usersId = [];
    users.forEach((item) => {
      usersId.push(item.id);
    });
    let contacts = await Contact.find({
      $or: [
        {
          $and: [{ userId: { $in: usersId } }, { contactId: currentUserId }],
        },
        {
          $and: [{ userId: currentUserId }, { contactId: { $in: usersId } }],
        },
      ],
    });
    let responseUsers = [];
    // users = users.map((user) => user.publicInfoTransform());

    users.forEach((userItem) => {
      let tempItem = { ...userItem, type: "notContact" };
      if (userItem.id == currentUserId) {
        tempItem.type = "you";
      } else {
        contacts.forEach((contactItem) => {
          if (userItem.id.toString() == contactItem.userId.toString()) {
            // request sent
            if (!!contactItem.status) {
              // accepted
              tempItem.type = "contact";
              return;
            } else {
              tempItem.type = "request";
              return;
            }
          } else if (
                   userItem.id.toString() == contactItem.contactId.toString()
                 ) {
                   // request
                   if (!!contactItem.status) {
                     // accepted
                     tempItem.type = "contact";
                     return;
                   } else {
                     tempItem.type = "requestSent";
                     return;
                   }
                 }
        });
      }
      responseUsers.push(tempItem);
    });

    // const transformedUsers = users.map(user => user.transform());
    res.json(responseUsers);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user
 * @public
 */
exports.remove = (req, res, next) => {
  const { user } = req.locals;

  user
    .remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch((e) => next(e));
};


// let avatarUploadFile = multer({
//   storage: storageAvatar,
//   limits: { fileSize: avatarLimitSize },
// }).single("avatar");

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

      let updateUserItem = {
        picture: req.file.filename,
        updatedAt: Date.now(),
      };

      // update user
      let userUpdate = await User.findOneAndUpdate(
        { _id: req.user.id },
        updateUserItem
      );

      // Delete old user picture
      if (userUpdate.picture) {
        await fsExtra.remove(`${avatarDirectory}/${userUpdate.picture}`); // return old item after updated
      }

      let result = {
        message: "success",
        picture: `${updateUserItem.picture}`,
      };
      return res.send(result);
    } catch (error) {
      next(error);
    }
  });
};

exports.iceServerList = async (req, res, next)=>{
  ICETurnServer()
    .then((iceServer) => res.json({ ice: iceServer }))
    .catch((err) => next(err));
}
