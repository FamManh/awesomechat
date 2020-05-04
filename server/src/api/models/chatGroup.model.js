const mongoose = require('mongoose')
const APIError = require('../utils/APIError')
const httpStatus = require('http-status')
let schema = mongoose.Schema;

let chatGroupSchema = new schema(
  {
    name: String,
    admin: String,
    members: {
      type: Array,
    },
    picture: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);


/**
 * Methods
 */
chatGroupSchema.method({
  transform() {
    const transformed = {};
    const fields = ["id","picture", "name", "members", "createdAt", "updatedAt"];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },

});

/**
 * Statics
 */
chatGroupSchema.statics = {
  /**
   * Get chatGroup
   *
   * @param {ObjectId} id - The objectId of chatGroup.
   * @returns {Promise<ChatGroup, APIError>}
   */
  async get(id) {
    try {
      let chatGroup;

      if (mongoose.Types.ObjectId.isValid(id)) {
        chatGroup = await this.findById(id).exec();
      }
      if (chatGroup) {
        return chatGroup;
      }

      throw new APIError({
        message: 'ChatGroup does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * List chatGroups in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of chatGroups to be skipped.
   * @param {number} limit - Limit number of chatGroups to be returned.
   * @returns {Promise<ChatGroup[]>}
   */
  async list({
    skip=0, userId, limit=12
  }) {
       return this.find({
         members: {
           $in: userId,
         },
       })
       .skip(+skip).limit(limit)
         .sort({ updatedAt: -1 })
         .exec();
     }
};

/**
 * @typedef ChatGroup
 */
module.exports = mongoose.model('ChatGroup', chatGroupSchema);

