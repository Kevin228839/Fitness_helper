const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/api/v1/user/autologin', userController.autoLogin);
router.delete('/api/v1/user/logout', userController.logout);
router.get('/api/v1/user/profile', userController.userProfile);

module.exports = router;
