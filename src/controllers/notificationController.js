const { sendEmail, sendPushNotification } = require('../services/notificationService');

exports.enrollmentNotification = async (req, res) => {
  const { workshopId, userId } = req.body;

  try {
    const user = await User.findByPk(userId);
    const workshop = await Workshop.findByPk(workshopId);

    if (!user || !workshop) return res.status(404).json({ error: 'Invalid data.' });

    const message = `You have successfully enrolled in the workshop: ${workshop.title}`;
    await sendEmail(user.email, 'Workshop Enrollment', message);
    await sendPushNotification(user.id, 'Workshop Enrollment', message);

    res.status(200).json({ message: 'Notifications sent.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

