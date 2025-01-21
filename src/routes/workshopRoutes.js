const express = require('express');
const { createWorkshop, enrollLearner } = require('../controllers/workshopController');
const router = express.Router();

router.post('/workshops', createWorkshop);
router.post('/workshops/:workshopId/enroll', enrollLearner);

module.exports = router;
