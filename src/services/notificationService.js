const nodemailer = require('nodemailer');
const { getMessaging } = require('firebase-admin/messaging');
const admin = require('firebase-admin');
const serviceAccount = require('../config/key_file.json');
const { User } = require('../models');
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,   // Ensure these are in your .env file
    pass: process.env.EMAIL_PASS,
  },
});

// Send Email Notification
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = { from: process.env.EMAIL_USER, to, subject, text };
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendPushNotification = async (userId, title, body) => {
  try {
    const user = await User.findByPk(userId);
    if (!user || !user.fcmToken) {
      console.log(`No valid FCM token for User ${userId}`);
      return;
    }

    const message = {
      notification: { title, body },
      token: user.fcmToken,
    };

    await getMessaging().send(message);
    console.log(`Push notification sent to User ${userId}`);
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
};

module.exports = { sendEmail, sendPushNotification };
