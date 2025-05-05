const express = require('express');
const router = express.Router();
const varietyController = require('../controllers/varietyController');

router.get('/variety/all', varietyController.getAllVarieties);
router.post('/variety', varietyController.createVariety);
router.get('/variety/:id', varietyController.getVarietyById);
router.put('/variety/:id', varietyController.updateVarietyById);
router.delete('/variety/:id', varietyController.deleteVarietyById);

module.exports = router;