const User = require('../models/User');
exports.updateNotificationPreferences = async (req, res) => {
  const { userId } = req.params;
  const { email, push } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { notificationPreferences: { email, push } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating notification preferences', error });
  }
};