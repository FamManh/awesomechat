const express = require('express'); const validate = require('express-validation'); const controller = require('../../controllers/contact.controller'); const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth'); const { createContact, deleteContact, updateContact } = require('../../validations/contact.validation'); const router = express.Router(); /** * Load contact when API with contactId route parameter is hit */ router.param('contactId', controller.load);


router
  .route("/")
  /**
   * @api {get} v1/contacts List Contacts
   * @apiDescription Get a list of contacts
   * @apiVersion 1.0.0
   * @apiName ListContacts
   * @apiGroup Contact
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Contact's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Contacts per page
   * @apiParam  {String}             [name]       Contact's name
   * @apiParam  {String}             [email]      Contact's email
   * @apiParam  {String=contact,admin}  [role]       Contact's role
   *
   * @apiSuccess {Object[]} contacts List of contacts.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated contacts can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(authorize(LOGGED_USER), /*validate(listContacts),*/ controller.list)
  /**
   * @api {post} v1/contacts Create Contact
   * @apiDescription Create a new contact
   * @apiVersion 1.0.0
   * @apiName CreateContact
   * @apiGroup Contact
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Contact's access token
   *
   * @apiParam  {String}             email     Contact's email
   * @apiParam  {String{6..128}}     password  Contact's password
   * @apiParam  {String{..128}}      [name]    Contact's name
   * @apiParam  {String=contact,admin}  [role]    Contact's role
   *
   * @apiSuccess (Created 201) {String}  id         Contact's id
   * @apiSuccess (Created 201) {String}  name       Contact's name
   * @apiSuccess (Created 201) {String}  email      Contact's email
   * @apiSuccess (Created 201) {String}  role       Contact's role
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated contacts can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(LOGGED_USER), validate(createContact), controller.create)
  /**
   * @api {patch} v1/contacts/:id Delete Contact
   * @apiDescription Delete a contact
   * @apiVersion 1.0.0
   * @apiName DeleteContact
   * @apiGroup Contact
   * @apiPermission contact
   *
   * @apiHeader {String} Authorization   Contact's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated contacts can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only contact with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      Contact does not exist
   */
  .delete(authorize(LOGGED_USER), validate(deleteContact), controller.remove)
  /**
   * @api {patch} v1/contacts/:id Update Contact
   * @apiDescription Update some fields of a contact document
   * @apiVersion 1.0.0
   * @apiName UpdateContact
   * @apiGroup Contact
   * @apiPermission contact
   *
   * @apiHeader {String} Authorization   Contact's access token
   *
   * @apiParam  {String}             email     Contact's email
   * @apiParam  {String{6..128}}     password  Contact's password
   * @apiParam  {String{..128}}      [name]    Contact's name
   * @apiParam  {String=contact,admin}  [role]    Contact's role
   * (You must be an admin to change the contact's role)
   *
   * @apiSuccess {String}  id         Contact's id
   * @apiSuccess {String}  name       Contact's name
   * @apiSuccess {String}  email      Contact's email
   * @apiSuccess {String}  role       Contact's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated contacts can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only contact with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Contact does not exist
   */
  .patch(authorize(LOGGED_USER), validate(updateContact), controller.update);
  


router
  .route('/:contactId')
  
  /**
   * @api {get} v1/contacts/:id Get Contact
   * @apiDescription Get contact information
   * @apiVersion 1.0.0
   * @apiName GetContact
   * @apiGroup Contact
   * @apiPermission contact
   *
   * @apiHeader {String} Authorization   Contact's access token
   *
   * @apiSuccess {String}  id         Contact's id
   * @apiSuccess {String}  name       Contact's name
   * @apiSuccess {String}  email      Contact's email
   * @apiSuccess {String}  role       Contact's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated contacts can access the data
   * @apiError (Forbidden 403)    Forbidden    Only contact with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     Contact does not exist
   */
  .get(authorize(LOGGED_USER), controller.get)
  /**
   * @api {put} v1/contacts/:id Replace Contact
   * @apiDescription Replace the whole contact document with a new one
   * @apiVersion 1.0.0
   * @apiName ReplaceContact
   * @apiGroup Contact
   * @apiPermission contact
   *
   * @apiHeader {String} Authorization   Contact's access token
   *
   * @apiParam  {String}             email     Contact's email
   * @apiParam  {String{6..128}}     password  Contact's password
   * @apiParam  {String{..128}}      [name]    Contact's name
   * @apiParam  {String=contact,admin}  [role]    Contact's role
   * (You must be an admin to change the contact's role)
   *
   * @apiSuccess {String}  id         Contact's id
   * @apiSuccess {String}  name       Contact's name
   * @apiSuccess {String}  email      Contact's email
   * @apiSuccess {String}  role       Contact's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated contacts can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only contact with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Contact does not exist
   */
  .put(authorize(LOGGED_USER), /* validate(replaceContact),*/ controller.replace)
  
  


module.exports = router;
