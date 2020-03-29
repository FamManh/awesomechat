const mongoose = require("mongoose");
const httpStatus = require("http-status");
const { omitBy, isNil } = require("lodash");
const moment = require("moment-timezone");
const uuidv4 = require("uuid/v4");
const APIError = require("../utils/APIError");
/**
 * Message Schema
 * @private
 */
const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    },
    message: {
      type: String,
      maxlength: 1000,
      min: 1
    },
    conversationId: String
  },
  {
    timestamps: true
  }
);

/**
 * Methods
 */
messageSchema.method({
  transform() {
    const transformed = {};
    const fields = ["id", "sender", "receiver", "createdAt", "message"];

    fields.forEach(field => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

/**
 * Statics
 */
messageSchema.statics = {
  /**
   * Get message
   *
   * @param {ObjectId} id - The objectId of message.
   * @returns {Promise<Message, APIError>}
   */
  get({ senderId, receiverId }) {
    return this.find({
      $or: [
        {
          $and: [{ sender: senderId }, { receiver: receiverId }]
        },
        {
          $and: [{ sender: receiverId }, { receiver: senderId }]
        }
      ]
    })
      .sort("-createdAt")
      .limit(20)
      .populate("sender", "id picture lastname firstname")
      .populate("receiver", "id picture lastname firstname")
      .exec();
  },

  /**
   * List messages in descending order of 'createdAt' timestamp.
   * Lấy danh sách những người mình đã gửi tin nhắn 
   * @param {number} skip - Number of messages to be skipped.
   * @param {number} limit - Limit number of messages to be returned.
   * @returns {Promise<Message[]>}
   */
  async list({ page = 1, perPage = 30, userId }) {
    return this.aggregate([
      { $match: { $or: [{ sender: userId }, { receiver: userId }] } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$conversationId",
          lastMessage: { $first: "$message" },
          sender: { $first: "$sender" },
          receiver: { $first: "$receiver" },
          createdAt: { $first: "$createdAt" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "sender",
          foreignField: "_id",
          as: "sender"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "receiver",
          foreignField: "_id",
          as: "receiver"
        }
      },
      { $unwind: { path: "$sender" } },
      { $unwind: { path: "$receiver" } },
      {
        $project: {
          _id: 0,
          lastMessage: 1,
          "sender._id": 1,
          "sender.firstname": 1,
          "sender.lastname": 1,
          "sender.picture": 1,
          "receiver._id": 1,
          "receiver.firstname": 1,
          "receiver.lastname": 1,
          "receiver.picture": 1,
          createdAt: 1
        }
      }
    ]);
  }
};

/**
 * @typedef Message
 */
module.exports = mongoose.model("Message", messageSchema);
