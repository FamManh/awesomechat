const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const APIError = require('../utils/APIError');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');

/**
 * Contact Schema
 * @private
 */
const contactSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User"
    },
    contactId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User"
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
contactSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next();

    const rounds = env === 'test' ? 1 : 10;

    const hash = await bcrypt.hash(this.password, rounds);
    this.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Methods
 */
contactSchema.method({
  transform() {
    const transformed = {};
    const fields = ["id", "userId", "contactId"];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },

});

/**
 * Statics
 */
contactSchema.statics = {
  /**
   * Get contact
   *
   * @param {ObjectId} id - The objectId of contact.
   * @returns {Promise<Contact, APIError>}
   */
  async get(id) {
    try {
      let contact;

      if (mongoose.Types.ObjectId.isValid(id)) {
        contact = await this.findById(id).exec();
      }
      if (contact) {
        return contact;
      }

      throw new APIError({
        message: 'Contact does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * List contacts in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of contacts to be skipped.
   * @param {number} limit - Limit number of contacts to be returned.
   * @returns {Promise<Contact[]>}
   */
  async list({
    page = 1, perPage = 30, term
  }) {
       const reg = new RegExp(term, "i");

       let options = term
         ? { $or: [{ firstname: reg }, { lastname: reg }] }
         : {};
       return this.find(options)
         .sort({ createdAt: -1 })
         .skip(perPage * (page - 1))
         .limit(perPage)
         .exec();
     }
};

/**
 * @typedef Contact
 */
module.exports = mongoose.model('Contact', contactSchema);
