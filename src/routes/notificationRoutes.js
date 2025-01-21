const express = require('express');
const { sendEmail, sendPushNotification } = require('../services/notificationService'); // Adjust the import according to your file structure
const router = express.Router();

// Define your POST routes
router.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;
  try {
    await sendEmail(to, subject, text);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
});

router.post('/send-push', async (req, res) => {
  const { userId, title, body } = req.body;
  try {
    await sendPushNotification(userId, title, body);
    res.status(200).send('Push notification sent');
  } catch (error) {
    res.status(500).send('Error sending push notification');
  }
});

module.exports = router;
