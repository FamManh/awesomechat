const Joi = require('joi');
const Contact = require('../models/contact.model');

module.exports = {
  // GET /v1/contacts
  // listContacts: {
  //   query: {
  //     page: Joi.number().min(1),
  //     perPage: Joi.number()
  //       .min(1)
  //       .max(100),
  //     name: Joi.string(),
  //     email: Joi.string(),
  //     role: Joi.string().valid(Contact.roles)
  //   }
  // },

  // POST /v1/contacts
  createContact: {
    query: {
      user: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  },

  // PUT /v1/contacts/:contactId
  // replaceContact: {
  //   body: {
  //     email: Joi.string()
  //       .email()
  //       .required(),
  //     password: Joi.string()
  //       .min(6)
  //       .max(128)
  //       .required(),
  //     name: Joi.string().max(128),
  //     role: Joi.string().valid(Contact.roles)
  //   },
  //   params: {
  //     contactId: Joi.string()
  //       .regex(/^[a-fA-F0-9]{24}$/)
  //       .required()
  //   }
  // },

  // PATCH /v1/contacts/:contactId
  updateContact: {
    query: {
      user: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  },
  deleteContact: {
    query: {
      user: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  }
};
