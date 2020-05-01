const Joi = require("joi");

module.exports = {
  imagesList: {
    query: {
      skip: Joi.number().min(0),
      limit: Joi.number().min(1),
      id: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    },
  },
  filesList: {
    query: {
      skip: Joi.number().min(0),
      limit: Joi.number().min(1),
      id: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    },
  },
};
