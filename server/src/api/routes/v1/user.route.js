const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/user.controller');
const { authorize, LOGGED_USER } = require('../../middlewares/auth');
const {
  listUsers,
  updateUser,updatePassword
} = require('../../validations/user.validation');


const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', controller.load);

router.route('/iceserver').get(controller.iceServerList)
// Cập nhật ảnh đại diện 
router.route("/avatar").post(authorize(LOGGED_USER), controller.updateAvatar)

router
  .route("/current")
  .get(authorize(LOGGED_USER), controller.getCurrentUser);

// Thay đổi mật khẩu 
router
  .route("/change-password")
  .patch(
    authorize(LOGGED_USER),
    validate(updatePassword),
    controller.updatePassword
  );

router
  .route("/")
  // tìm kiếm người dùng 
  .get(authorize(LOGGED_USER), validate(listUsers), controller.list)
  // Cập nhật người dùng 
  .patch(authorize(LOGGED_USER), validate(updateUser), controller.update);

router
  .route('/profile')
  // Lấy thông tin người dùng hiện tại 
  .get(authorize(), controller.loggedIn);


router
  .route('/:userId')
  // lấy thông tin người dùng theo id 
  .get(authorize(LOGGED_USER), controller.get)  
  // Xóa người dùng 
  .delete(authorize(LOGGED_USER), controller.remove);


module.exports = router;
