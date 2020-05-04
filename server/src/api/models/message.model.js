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

const messageTypes = ["text", "image", "file", "notification"];
const conversationTypes = ["User", "ChatGroup"];

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      required: true,

      refPath: "conversationType",
    },
    conversationType: {
      type: String,
      enum: conversationTypes,
      default: "User",
    },
    type: {
      type: String,
      enum: messageTypes,
      default: "text",
    },
    message: {
      type: String,
      maxlength: 1000,
      min: 1,
    },
    images: [String],
    files:[{
      name: String,
      path: String
    }],
    conversationId: String,
  },
  {
    timestamps: true,
  }
);

/**
 * Methods
 */
messageSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "id",
      "sender",
      "receiver",
      "createdAt",
      "message",
      "images",
      "type",
      "conversationType",
      "files"
    ];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

/**
 * Statics
 */
messageSchema.statics = {
  messageTypes,
  conversationTypes,
  // Lấy danh sách tin nhắn riếng tư
  getPersonal({ senderId, receiverId, skip = 0, limit = 20 }) {
    return this.find({
      $or: [
        {
          $and: [{ sender: senderId }, { receiver: receiverId }],
        },
        {
          $and: [{ sender: receiverId }, { receiver: senderId }],
        },
      ],
    })
      .sort("-createdAt")
      .limit(limit)
      .skip(skip)
      .populate("sender", "id picture lastname firstname")
      .populate("receiver", "id picture lastname firstname")
      .exec();
  },

  // Lấy danh sách tin nhắn group
  getGroup({ groupId, skip = 0, limit = 20 }) {
    return this.find({
      $and: [{ receiver: groupId }],
    })
      .sort("-createdAt")
      .limit(limit)
      .skip(skip)
      .populate("sender", "id picture lastname firstname")
      .exec();
  },

  /**
   * List messages in descending order of 'createdAt' timestamp.
   * Lấy danh sách những người mình đã gửi tin nhắn
   * @param {number} skip - Number of messages to be skipped.
   * @param {number} limit - Limit number of messages to be returned.
   * @returns {Promise<Message[]>}
   */
  async listPersonal({ limit = 12, skip=0, userId }) {
    return this.aggregate([
      {
        $match: {
          $and: [
            { $or: [{ sender: userId }, { receiver: userId }] },
            { conversationType: "User" },
          ],
        },
      },
      { $sort: { updatedAt: -1 } },

      {
        $group: {
          _id: "$conversationId",
          message: { $first: "$message" },
          type: { $first: "$type" },
          conversationType: { $first: "$conversationType" },
          lastImages: { $first: "$message" },
          sender: { $first: "$sender" },
          receiver: { $first: "$receiver" },
          updatedAt: { $first: "$updatedAt" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "sender",
          foreignField: "_id",
          as: "sender",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "receiver",
          foreignField: "_id",
          as: "receiver",
        },
      },
      { $unwind: { path: "$sender" } },
      { $unwind: { path: "$receiver" } },
      {
        $project: {
          _id: 0,
          message: 1,
          type: 1,
          conversationType: 1,
          "sender._id": 1,
          "sender.firstname": 1,
          "sender.lastname": 1,
          "sender.picture": 1,
          "receiver._id": 1,
          "receiver.firstname": 1,
          "receiver.lastname": 1,
          "receiver.picture": 1,
          updatedAt: 1,
        },
      },
      { $skip: +skip },
      { $limit: limit },
    ]);
  },

  // Lấy danh sách hình ảnh dựa vào conversation id
  imagesList({ conversationId, limit = 9, skip = 0 }) {
    return this.aggregate([
      {
        $match: { conversationId: conversationId },
      },
      { $sort: { updatedAt: -1 } },
      {
        $group: {
          _id: "$conversationId",
          images: { $push: { $reverseArray: "$images" } },
        },
      },
      {
        $addFields: {
          list: {
            $reduce: {
              input: "$images",
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] },
            },
          },
        },
      },
      {
        $project: { list: { $slice: ["$list", +skip, +limit] } },
      },
    ]);
  },

  // Lấy danh sách files dựa vào conversation Id
  filesList({ conversationId, limit = 9, skip = 0 }) {
    return this.aggregate([
      {
        $match: { conversationId: conversationId },
      },
      { $sort: { updatedAt: -1 } },
      {
        $group: {
          _id: "$conversationId",
          files: { $push: { $reverseArray: "$files" } },
        },
      },
      {
        $addFields: {
          list: {
            $reduce: {
              input: "$files",
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] },
            },
          },
        },
      },
      {
        $project: { list: { $slice: ["$list", +skip, +limit] } },
      },
    ]);
  },
};

/**
 * @typedef Message
 */
module.exports = mongoose.model("Message", messageSchema);
