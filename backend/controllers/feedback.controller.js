const Feedback = require('../models/Feedback');

// Create feedback - patients only
exports.createFeedback = async (req, res, next) => {
  try {
    if (req.user.role !== 'patient') return res.status(403).json({ msg: 'Access denied' });
    const { doctor, rating, comments } = req.body;
    const patient = req.user._id;

    const feedback = await Feedback.create({ doctor, patient, rating, comments });
    res.status(201).json(feedback);
  } catch (error) {
    next(error);
  }
};

// Get feedback for doctor/self/admin
exports.getFeedback = async (req, res, next) => {
  try {
    let filter = {};
    if (req.user.role === 'doctor') filter.doctor = req.user._id;
    if (req.user.role === 'patient') filter.patient = req.user._id;

    const feedbacks = await Feedback.find(filter)
      .populate('doctor', 'name email')
      .populate('patient', 'name email');

    res.json(feedbacks);
  } catch (error) {
    next(error);
  }
};
