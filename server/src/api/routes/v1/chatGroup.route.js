const express = require("express");
const validate = require("express-validation");
const controller = require("../../controllers/chatGroup.controller");
const { authorize, ADMIN, LOGGED_USER } = require("../../middlewares/auth");
const {
  createChatGroup,
  deleteChatGroup,
  updateChatGroup,
} = require("../../validations/chatGroup.validation");
const router = express.Router();
/** * Load chatGroup when API with chatGroupId route parameter is hit */ router.param(
  "chatGroupId",
  controller.load
);

router
  .route("/")
  /**
   * @api {get} v1/chatGroups List ChatGroups
   * @apiDescription Get a list of chatGroups
   * @apiVersion 1.0.0
   * @apiName ListChatGroups
   * @apiGroup ChatGroup
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   ChatGroup's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  ChatGroups per page
   * @apiParam  {String}             [name]       ChatGroup's name
   * @apiParam  {String}             [email]      ChatGroup's email
   * @apiParam  {String=chatGroup,admin}  [role]       ChatGroup's role
   *
   * @apiSuccess {Object[]} chatGroups List of chatGroups.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated chatGroups can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(authorize(LOGGED_USER), /*validate(listChatGroups),*/ controller.list)
  /**
   * @api {post} v1/chatGroups Create ChatGroup
   * @apiDescription Create a new chatGroup
   * @apiVersion 1.0.0
   * @apiName CreateChatGroup
   * @apiGroup ChatGroup
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   ChatGroup's access token
   *
   * @apiParam  {String}             email     ChatGroup's email
   * @apiParam  {String{6..128}}     password  ChatGroup's password
   * @apiParam  {String{..128}}      [name]    ChatGroup's name
   * @apiParam  {String=chatGroup,admin}  [role]    ChatGroup's role
   *
   * @apiSuccess (Created 201) {String}  id         ChatGroup's id
   * @apiSuccess (Created 201) {String}  name       ChatGroup's name
   * @apiSuccess (Created 201) {String}  email      ChatGroup's email
   * @apiSuccess (Created 201) {String}  role       ChatGroup's role
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated chatGroups can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(LOGGED_USER), validate(createChatGroup), controller.create)
  /**
   * @api {patch} v1/chatGroups/:id Delete ChatGroup
   * @apiDescription Delete a chatGroup
   * @apiVersion 1.0.0
   * @apiName DeleteChatGroup
   * @apiGroup ChatGroup
   * @apiPermission chatGroup
   *
   * @apiHeader {String} Authorization   ChatGroup's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated chatGroups can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only chatGroup with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      ChatGroup does not exist
   */
  .delete(authorize(LOGGED_USER), validate(deleteChatGroup), controller.remove)
  /**
   * @api {patch} v1/chatGroups/:id Update ChatGroup
   * @apiDescription Update some fields of a chatGroup document
   * @apiVersion 1.0.0
   * @apiName UpdateChatGroup
   * @apiGroup ChatGroup
   * @apiPermission chatGroup
   *
   * @apiHeader {String} Authorization   ChatGroup's access token
   *
   * @apiParam  {String}             email     ChatGroup's email
   * @apiParam  {String{6..128}}     password  ChatGroup's password
   * @apiParam  {String{..128}}      [name]    ChatGroup's name
   * @apiParam  {String=chatGroup,admin}  [role]    ChatGroup's role
   * (You must be an admin to change the chatGroup's role)
   *
   * @apiSuccess {String}  id         ChatGroup's id
   * @apiSuccess {String}  name       ChatGroup's name
   * @apiSuccess {String}  email      ChatGroup's email
   * @apiSuccess {String}  role       ChatGroup's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated chatGroups can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only chatGroup with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     ChatGroup does not exist
   */
  .patch(authorize(LOGGED_USER), validate(updateChatGroup), controller.update);

router
  .route("/:chatGroupId")

  /**
   * @api {get} v1/chatGroups/:id Get ChatGroup
   * @apiDescription Get chatGroup information
   * @apiVersion 1.0.0
   * @apiName GetChatGroup
   * @apiGroup ChatGroup
   * @apiPermission chatGroup
   *
   * @apiHeader {String} Authorization   ChatGroup's access token
   *
   * @apiSuccess {String}  id         ChatGroup's id
   * @apiSuccess {String}  name       ChatGroup's name
   * @apiSuccess {String}  email      ChatGroup's email
   * @apiSuccess {String}  role       ChatGroup's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated chatGroups can access the data
   * @apiError (Forbidden 403)    Forbidden    Only chatGroup with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     ChatGroup does not exist
   */
  .get(authorize(LOGGED_USER), controller.get)
  /**
   * @api {put} v1/chatGroups/:id Replace ChatGroup
   * @apiDescription Replace the whole chatGroup document with a new one
   * @apiVersion 1.0.0
   * @apiName ReplaceChatGroup
   * @apiGroup ChatGroup
   * @apiPermission chatGroup
   *
   * @apiHeader {String} Authorization   ChatGroup's access token
   *
   * @apiParam  {String}             email     ChatGroup's email
   * @apiParam  {String{6..128}}     password  ChatGroup's password
   * @apiParam  {String{..128}}      [name]    ChatGroup's name
   * @apiParam  {String=chatGroup,admin}  [role]    ChatGroup's role
   * (You must be an admin to change the chatGroup's role)
   *
   * @apiSuccess {String}  id         ChatGroup's id
   * @apiSuccess {String}  name       ChatGroup's name
   * @apiSuccess {String}  email      ChatGroup's email
   * @apiSuccess {String}  role       ChatGroup's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated chatGroups can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only chatGroup with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     ChatGroup does not exist
   */
  .put(
    authorize(LOGGED_USER),
    /* validate(replaceChatGroup),*/ controller.replace
  );

module.exports = router;
