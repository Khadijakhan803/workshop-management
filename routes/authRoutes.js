const express = require('express');
const router = express.Router();
const { getAuthUrl, getTokens } = require('../config/googleAuth');

router.get('/auth/google', (req, res) => {
  const authUrl = getAuthUrl();
  res.redirect(authUrl);
});

router.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const tokens = await getTokens(code);
    res.redirect('/');
  } catch (error) {
    console.error('Error during Google OAuth2 callback:', error);
    res.status(500).send('Error during Google OAuth2 callback');
  }
});

module.exports = router;