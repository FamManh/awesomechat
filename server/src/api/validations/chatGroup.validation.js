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
      members: Joi.array()
        .min(2)
        .max(50)
        .items(
          Joi.string()
            .regex(/^[a-fA-F0-9]{24}$/)
            .required()
        ),
      name: Joi.string().min(1).max(50).required(),
    },
  },

  // PATCH /v1/chatGroups/:chatGroupId
  updateChatGroup: {
    body: {
      id: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
      name: Joi.string().min(1).max(50).required(),
    },
  },
  deleteChatGroup: {
    query: {
      chatGroupId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    },
  },

  removeMember: {
    query: {
      group: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
      user: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    },
  },

  addMember: {
    body: {
      members: Joi.array()
        .items(
          Joi.string()
            .regex(/^[a-fA-F0-9]{24}$/)
            .required()
        )
        .min(1)
        .max(50),
      groupId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    },
  },
};
