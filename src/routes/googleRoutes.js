const express = require('express');
const { getGoogleAuthUrl, createCalendarEvent } = require('../services/googleService');

const router = express.Router();

router.get('/google/auth', (req, res) => {
  const url = getGoogleAuthUrl();
  res.json({ url });
});

router.post('/google/event', async (req, res) => {
  try {
    const event = await createCalendarEvent(req.body.workshop);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
