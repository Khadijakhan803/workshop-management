const Workshop = require('../models/workshop');
const User = require('../models/User');
const io = require('../server');

exports.createWorkshop = async (req, res) => {
  const { title, description, mentorId } = req.body;

  try {
    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== 'mentor') {
      return res.status(400).json({ message: 'Invalid mentor ID or role' });
    }

    const workshop = new Workshop({ title, description, mentor: mentorId });
    await workshop.save();
    res.status(201).json(workshop);
  } catch (error) {
    res.status(500).json({ message: 'Error creating workshop', error });
  }
};

exports.addActivity = async (req, res) => {
  const workshopId = req.params.id;
  const { title, description, startTime, endTime, location } = req.body;

  try {
    const workshop = await Workshop.findById(workshopId);
    if (!workshop) {
      return res.status(404).json({ message: 'Workshop not found' });
    }

    workshop.activities.push({ title, description, startTime, endTime, location });
    await workshop.save();
    res.status(201).json(workshop);
  } catch (error) {
    res.status(500).json({ message: 'Error adding activity', error });
  }
};

exports.enrollInWorkshop = async (req, res) => {
  const workshopId = req.params.id;
  const { learnerId } = req.body;

  try {
    const workshop = await Workshop.findById(workshopId);
    const learner = await User.findById(learnerId);

    if (!workshop || !learner || learner.role !== 'learner') {
      return res.status(400).json({ message: 'Invalid workshop or learner ID' });
    }

    if (workshop.enrolledLearners.includes(learnerId)) {
      return res.status(400).json({ message: 'Already enrolled in this workshop' });
    }

    workshop.enrolledLearners.push(learnerId);
    await workshop.save();
    io.emit('enrollment', {
      workshopId,
      workshopTitle: workshop.title,
      learnerId,
      learnerName: learner.name,
      message: `${learner.name} has enrolled in your workshop: ${workshop.title}`,
    });
    io.emit('enrollmentConfirmed', {
      workshopId,
      workshopTitle: workshop.title,
      learnerId,
      message: `Your enrollment in ${workshop.title} has been confirmed.`,
    });

    res.status(200).json({ message: 'Enrollment successful', workshop });
  } catch (error) {
    res.status(500).json({ message: 'Error enrolling in workshop', error });
  }
};

exports.getAllWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.find().populate('mentor', 'name email');
    res.status(200).json(workshops);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workshops', error });
  }
};

exports.getWorkshopById = async (req, res) => {
  const workshopId = req.params.id;

  try {
    const workshop = await Workshop.findById(workshopId).populate('mentor', 'name email');
    if (!workshop) {
      return res.status(404).json({ message: 'Workshop not found' });
    }
    res.status(200).json(workshop);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workshop', error });
  }
};