const Joi = require('joi');
const ChatGroup = require('../models/chatGroup.model');

module.exports = {
  // GET /v1/chatGroups
  // listChatGroups: {
  //   query: {
  //     page: Joi.number().min(1),
  //     perPage: Joi.number()
  //       .min(1)
  //       .max(100),
  //     name: Joi.string(),
  //     email: Joi.string(),
  //     role: Joi.string().valid(ChatGroup.roles)
  //   }
  // },

  // POST /v1/chatGroups
  createChatGroup: {
    body: {
      members: Joi.array(),
      name: Joi.string()
    }
  },

  // PUT /v1/chatGroups/:chatGroupId
  // replaceChatGroup: {
  //   body: {
  //     email: Joi.string()
  //       .email()
  //       .required(),
  //     password: Joi.string()
  //       .min(6)
  //       .max(128)
  //       .required(),
  //     name: Joi.string().max(128),
  //     role: Joi.string().valid(ChatGroup.roles)
  //   },
  //   params: {
  //     chatGroupId: Joi.string()
  //       .regex(/^[a-fA-F0-9]{24}$/)
  //       .required()
  //   }
  // },

  // PATCH /v1/chatGroups/:chatGroupId
  updateChatGroup: {
    query: {
      user: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    },
  },
  deleteChatGroup: {
    query: {
      user: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    },
  },
};
