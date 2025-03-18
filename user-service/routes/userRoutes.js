const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/me', authMiddleware, userController.getMyProfile);
router.patch('/update/:userId', authMiddleware, userController.updateProfile);
router.post(
  '/create',
  authMiddleware,
  adminMiddleware,
  userController.createProfile
);
router.delete(
  '/delete/:userId',
  authMiddleware,
  adminMiddleware,
  userController.deleteProfile
);

module.exports = router;
