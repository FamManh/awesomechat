const express = require("express");
const validate = require("express-validation");
const controller = require("../../controllers/message.controller");
const { authorize, ADMIN, LOGGED_USER } = require("../../middlewares/auth");
const {
  imagesList,
  filesList
} = require("../../validations/message.validation");

const router = express.Router();

/**
 * Load contact when API with contactId route parameter is hit
 */
router.param("contactId", controller.load);

router
  .route("/images")
  .get(authorize(LOGGED_USER), validate(imagesList), controller.imagesList);

router
  .route("/files")
  .get(authorize(LOGGED_USER), validate(filesList), controller.filesList);

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
  .post(authorize(LOGGED_USER), controller.create)

router.route("/photos").post(controller.addPhotos);
router.route("/files").post(controller.addFiles);

router
  .route("/:receiverId")

  /**
   * @api {get} 
   * @apiDescription Get user message
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
  .get(authorize(LOGGED_USER), controller.get);


module.exports = router;
