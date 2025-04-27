const express = require('express');
const router = express.Router();
const oauthController = require('../controllers/oauthController');

router.get('/api/v1/oauth/google', oauthController.handleGoogleOauth);

module.exports = router;
