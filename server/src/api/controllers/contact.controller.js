const httpStatus = require("http-status");
const { omit } = require("lodash");
const Contact = require("../models/contact.model");
const User = require("../models/user.model");
const APIError = require("../utils/APIError");

/**
 * Load contact and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const contact = await Contact.get(id);
    req.locals = { contact };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get contact
 * @public
 */
exports.get = (req, res) => res.json(req.locals.contact.transform());

/**
 * Get logged in contact info
 * @public
 */
exports.loggedIn = (req, res) => res.json(req.contact.transform());

/**
 * Create new contact
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    // check user exists
    const contactUser = await User.get(req.query.user);
    const currentUser = req.user;

    // contact user and current is not should equal
    if (req.query.user == currentUser.id) {
      throw new APIError({
        message: "Something went wrong",
        status: httpStatus.BAD_REQUEST
      });
    }
    // check contact exists
    const checkContact = await Contact.findOne({
      $or: [
        {
          $and: [{ userId: currentUser.id }, { contactId: contactUser.id }]
        },
        {
          $and: [{ userId: contactUser.id }, { contactId: currentUser.id }]
        }
      ]
    });

    if (checkContact) {
      throw new APIError({
        message: "Contact already exist",
        status: httpStatus.BAD_REQUEST
      });
    }

    const contact = new Contact({
      userId: currentUser.id,
      contactId: contactUser.id
    });
    const savedContact = await contact.save();
    res.status(httpStatus.CREATED);
    res.json(savedContact.transform());
  } catch (error) {
    next(error);
  }
};

/**
 * Replace existing contact
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const { contact } = req.locals;
    const newContact = new Contact(req.body);
    const ommitRole = contact.role !== "admin" ? "role" : "";
    const newContactObject = omit(newContact.toObject(), "_id", ommitRole);

    await contact.updateOne(newContactObject, { override: true, upsert: true });
    const savedContact = await Contact.findById(contact._id);

    res.json(savedContact.transform());
  } catch (error) {
    next(Contact.checkDuplicateEmail(error));
  }
};

/**
 * Update existing contact
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    // check user exists
    const contactUser = await User.get(req.query.user);
    const currentUser = req.user;

    // check contact exists
    const contact = await Contact.findOne({
      $or: [
        {
          $and: [{ userId: currentUser.id }, { contactId: contactUser.id }]
        },
        {
          $and: [{ userId: contactUser.id }, { contactId: currentUser.id }]
        }
      ]
    });
    if (contact) {
      contact.status = true;
      const savedContact = await contact.save();
      res.status(httpStatus.CREATED);
      res.json(savedContact.transform());
    } else {
      throw new APIError({
        message: "Contact does not exist",
        status: httpStatus.BAD_REQUEST
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Get contact list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    let currentUserId = req.user.id;

    // get type
    const type = ["request", "contact", "requestsent"].includes(
      req.query.type.toLowerCase()
    )
      ? req.query.type.toLowerCase()
      : "contact";

    // get conditions
    let options = {};
    if (type === "request") {
      options = {
        $and: [{ status: false }, { contactId: currentUserId }]
      };
    } else if (type === "requestsent") {
      options = {
        $and: [{ status: false }, { userId: currentUserId }]
      };
    } else {
      options = {
        $and: [
          {
            $or: [{ contactId: currentUserId }, { userId: currentUserId }]
          },
          { status: true }
        ]
      };
    }
    const contacts = await Contact.find(options)
      .populate("userId", "id firstname lastname picture createdAt")
      .populate("contactId", "id firstname lastname picture createdAt");

    // get list users
    let responseList = [];
    contacts.forEach(item => {
      if (item.userId.id == currentUserId) {
        responseList.push(item.contactId.transform());
      } else if (item.contactId.id == currentUserId) {
        responseList.push(item.userId.transform());
      }
    });
    res.json(responseList);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete contact
 * @public
 */
exports.remove = async (req, res, next) => {
  try {
    // check user exists
    const contactUser = await User.get(req.query.user);
    const currentUser = req.user;

    // check contact exists
    const contact = await Contact.findOne({
      $or: [
        {
          $and: [{ userId: currentUser.id }, { contactId: contactUser.id }]
        },
        {
          $and: [{ userId: contactUser.id }, { contactId: currentUser.id }]
        }
      ]
    });

    if (contact) {
      contact
        .remove()
        .then(() => res.status(httpStatus.OK).end())
        .catch(e => next(e));
    } else {
      throw new APIError({
        message: "Contact does not exist",
        status: httpStatus.BAD_REQUEST
      });
    }
  } catch (error) {
    next(error);
  }
};
