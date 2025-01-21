const { Workshop, Activity, User } = require('../models');

exports.createWorkshop = async (req, res) => {
  try {
    const { title, description, location } = req.body;
    const mentorId = req.user.id; 
    const workshop = await Workshop.create({ title, description, location, mentorId });
    res.status(201).json(workshop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.enrollLearner = async (req, res) => {
  try {
    const { workshopId } = req.params;
    const learnerId = req.user.id;
    const workshop = await Workshop.findByPk(workshopId);
    if (!workshop) return res.status(404).json({ error: 'Workshop not found.' });

    await workshop.addLearner(learnerId);
    res.status(200).json({ message: 'Enrollment successful.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
