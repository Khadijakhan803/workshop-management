const express = require('express');
const router = express.Router();
const workshopController = require('../controllers/workshopController');

router.post('/', workshopController.createWorkshop);
router.post('/:id/activities', workshopController.addActivity);
router.post('/:id/enroll', workshopController.enrollInWorkshop);
router.get('/', workshopController.getAllWorkshops);
router.get('/:id', workshopController.getWorkshopById);

module.exports = router;