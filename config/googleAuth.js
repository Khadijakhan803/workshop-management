const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const getAuthUrl = () => {
    const scopes = [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
    ];
  
    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI, // Ensure this is set
    });
  };
  const getTokens = async (code) => {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    return tokens;
  };
  
  module.exports = { oauth2Client, getAuthUrl, getTokens };