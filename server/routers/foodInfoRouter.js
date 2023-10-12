const express = require('express');
const router = express.Router();
const foodInfoController = require('../controllers/foodInfoController');

router.get('/api/v1/foodinfo/general', foodInfoController.getFoodInfo);

module.exports = router;
