const express = require('express');
const router = express.Router();
const foodInfoController = require('../controllers/foodInfoController');

router.get('/api/v1/foodinfo/general', foodInfoController.getFoodInfo);
router.post('/api/v1/foodinfo/upload', foodInfoController.addFood);

module.exports = router;
