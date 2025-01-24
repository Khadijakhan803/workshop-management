const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.put('/:userId/notifications', userController.updateNotificationPreferences);

module.exports = router;