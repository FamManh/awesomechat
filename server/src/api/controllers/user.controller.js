const httpStatus = require("http-status");
const { omit } = require("lodash");
const User = require("../models/user.model");
const Contact = require("../models/contact.model");
const _ = require("lodash");
const uuidv4 = require("uuid/v4");
const multer = require("multer");
const fsExtra = require("fs-extra");
const APIError = require("../utils/APIError");

const {
  avatarDirectory,
  avatarTypes,
  avatarLimitSize
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
  const user = await User.findById(req.user.id)
  return res.json(user.transform());
};

/**
 * Get logged in user info
 * @public
 */
exports.loggedIn = (req, res) => res.json(req.user.transform());

/**
 * Create new user
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(httpStatus.CREATED);
    res.json(savedUser.transform());
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

/**
 * Replace existing user
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const { user } = req.locals;
    const newUser = new User(req.body);
    const ommitRole = user.role !== "admin" ? "role" : "";
    const newUserObject = omit(newUser.toObject(), "_id", ommitRole);

    await user.updateOne(newUserObject, { override: true, upsert: true });
    const savedUser = await User.findById(user._id);

    res.json(savedUser.transform());
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

/**
 * Update existing user
 * @public
 */
exports.update = async (req, res, next) => {
  let user = await User.get(req.user.id);
  const ommitRole = user.role !== "admin" ? "role" : "";
  
  const updatedUser = omit(req.body, ommitRole);
  user = Object.assign(user, updatedUser);
  user
    .save()
    .then(savedUser => res.json(savedUser.transform()))
    .catch(e => next(User.checkDuplicateUsername(e)));
    
};

/**
 * Update user's password
 * @public
 */
// exports.updatePassword = (req, res, next) => {
//   let user = await User.get(req.user.id);
//   const ommitRole = user.role !== "admin" ? "role" : "";
//   const updatedUser = omit(req.body, ommitRole);
//   user = Object.assign(user, updatedUser);
//   user
//     .save()
//     .then(savedUser => res.json(savedUser.transform()))
//     .catch(e => next(User.checkDuplicateUsername(e)));
    
// };

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
    users.forEach(item => {
      usersId.push(item.id);
    });
    let contacts = await Contact.find({
      $or: [
        {
          $and: [{ userId: { $in: usersId } }, { contactId: currentUserId }]
        },
        {
          $and: [{ userId: currentUserId }, { contactId: { $in: usersId } }]
        }
      ]
    });

    let responseUsers = [];
    users = users.map(user => user.transform());

    users.forEach(userItem => {
      let tempItem = { ...userItem, type: "notContact" };
      if (userItem.id == currentUserId) {
        tempItem.type = "you";
      } else {
        contacts.forEach(contactItem => {
          if (userItem.id == contactItem.userId) {
            // request sent
            if (contactItem.status) {
              // accepted
              tempItem.type = "contact";
              return;
            } else {
              tempItem.type = "request";
              return;
            }
          } else if (userItem.id == contactItem.contactId) {
            // request
            if (contactItem.status) {
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
    .catch(e => next(e));
};

let storageAvatar = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, avatarDirectory);
  },
  filename: (req, file, callback) => {
    let math = avatarTypes;
    if (math.indexOf(file.mimetype) === -1) {
      return callback(transErrors.avatar_type, null);
    }
    let avatarName = `${Date.now()}-${uuidv4()}-${file.originalname}`;
    callback(null, avatarName);
  }
});

let avatarUploadFile = multer({
  storage: storageAvatar,
  limits: { fileSize: avatarLimitSize }
}).single("avatar");

exports.updateAvatar = (req, res, next) => {
  avatarUploadFile(req, res, async err => {
    try {
      if (!req.file) {
        throw new APIError({
          message: "Please select a file.",
          status: httpStatus.BAD_REQUEST
        });
      }
    
      let updateUserItem = {
        picture: 'images/users/' + req.file.filename,
        updatedAt: Date.now()
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
        picture: `${avatarDirectory}/${updateUserItem.picture}`
      };
      return res.send(result);
    } catch (error) {
      next(error);
    }
  });
};
