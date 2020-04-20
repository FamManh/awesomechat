const Joi = require('joi');
const ChatGroup = require('../models/chatGroup.model');

module.exports = {
  // GET /v1/chatGroups
  listChatGroup: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
    },
  },

  // POST /v1/chatGroups
  createChatGroup: {
    body: {
      members: Joi.array().min(3).max(50),
      name: Joi.string().required(),
    },
  },

  // PATCH /v1/chatGroups/:chatGroupId
  updateChatGroup: {
    query: {
      chatGroupId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    },
    body: {
      members: Joi.array().min(3).max(50),
      name: Joi.string().required(),
    },
  },
  deleteChatGroup: {
    query: {
      chatGroupId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    },
  },
};
