const Appointment = require('../models/Appointment');

// Create appointment - patients only
exports.createAppointment = async (req, res, next) => {
  try {
    const { doctor, appointmentDate } = req.body;
    const patient = req.user._id;
    const appointment = await Appointment.create({ patient, doctor, appointmentDate });
    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
};

// Get appointments - patients see own; doctors see own; admins see all
exports.getAppointments = async (req, res, next) => {
  try {
    let filter = {};
    if (req.user.role === 'patient') filter.patient = req.user._id;
    if (req.user.role === 'doctor') filter.doctor = req.user._id;

    const appointments = await Appointment.find(filter)
      .populate('patient', 'name email')
      .populate('doctor', 'name email');

    res.json(appointments);
  } catch (error) {
    next(error);
  }
};

// Update appointment status - doctors and admins only
exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });

    if (req.user.role === 'doctor' && appointment.doctor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: 'You are not authorized to update this appointment' });
    }

    appointment.status = status;
    await appointment.save();

    res.json(appointment);
  } catch (error) {
    next(error);
  }
};

// Delete appointment - patient, doctor (involved parties), or admin only
exports.deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });

    if (req.user.role !== 'admin' &&
      appointment.patient.toString() !== req.user._id.toString() &&
      appointment.doctor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: 'Forbidden' });
    }

    await appointment.deleteOne();
    res.json({ msg: 'Appointment deleted' });
  } catch (error) {
    next(error);
  }
};
