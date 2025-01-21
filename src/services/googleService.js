const { google } = require('googleapis');
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/oauth2callback'
);
const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
exports.getGoogleAuthUrl = () => {
  const scopes = ['https://www.googleapis.com/auth/calendar.events'];
  return oauth2Client.generateAuthUrl({ access_type: 'offline', scope: scopes });
};
exports.createCalendarEvent = async (workshop) => {
  const event = {
    summary: workshop.title,
    location: workshop.location,
    description: workshop.description,
    start: { dateTime: workshop.startTime, timeZone: 'UTC' },
    end: { dateTime: workshop.endTime, timeZone: 'UTC' },
  };

  const response = await calendar.events.insert({
    calendarId: 'primary',
    resource: event,
  });

  return response.data;
};
