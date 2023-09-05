const express = require('express');
const router = express.Router();
const foodInfoController = require('../controllers/foodInfoController');

router.get('/api/v1/foodinfo', foodInfoController.getFoodInfo);
router.get('/api/v1/fooddetail', foodInfoController.getFoodDetail);

module.exports = router;
