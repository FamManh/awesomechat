const mongoose = require('mongoose')

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
    const fields = ["id", "name", "members", "createdAt", "updatedAt"];

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
    page = 1, perPage = 30, userId
  }) {
       return this.find({
         members: {
           $in: userId,
         },
       })
         .sort({ updatedAt: -1 })
         .exec();
     }
};

/**
 * @typedef ChatGroup
 */
module.exports = mongoose.model('ChatGroup', chatGroupSchema);

