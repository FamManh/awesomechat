const express = require("express");
const validate = require("express-validation");
const controller = require("../../controllers/message.controller");
const { authorize, ADMIN, LOGGED_USER } = require("../../middlewares/auth");
const {
  imagesList,
  filesList,
  getConversation,
  createMessage,
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
  // Lấy danh sách cuộc trò chuyện và tin nhắn cuối cùng 
  .get(authorize(LOGGED_USER), /*validate(list),*/ controller.list)
  // Tạo mới tin nhắn 
  .post(authorize(LOGGED_USER), validate(createMessage), controller.create);

router.route("/photos").post(authorize(LOGGED_USER),controller.addPhotos);
router.route("/files").post(authorize(LOGGED_USER),controller.addFiles);

router
  .route("/:receiverId")

  // Lấy thông tin cuộc trò chuyện dựa vào id
  .get(authorize(LOGGED_USER), validate(getConversation), controller.get);


module.exports = router;
