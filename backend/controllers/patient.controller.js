const Patient = require('../models/Patient');

// Create or update patient record - doctor/admin only
exports.createOrUpdatePatient = async (req, res, next) => {
  try {
    const { userId, ...patientData } = req.body;
    let patient = await Patient.findOne({ user: userId });
    if (patient) {
      Object.assign(patient, patientData);
      await patient.save();
      return res.json(patient);
    }
    patient = await Patient.create({ user: userId, ...patientData });
    res.status(201).json(patient);
  } catch (error) {
    next(error);
  }
};

// Get a patient record - doctor/admin any record, patient only self
exports.getPatient = async (req, res, next) => {
  try {
    const filter = (req.user.role === 'patient')
      ? { user: req.user._id }
      : req.params.id
        ? { _id: req.params.id }
        : {};
    const patient = await Patient.findOne(filter).populate('user', 'name email');
    if(!patient) return res.status(404).json({ msg: 'Patient record not found' });
    res.json(patient);
  } catch (error) {
    next(error);
  }
};

// Delete patient record - doctor/admin only
exports.deletePatient = async (req, res, next) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Patient record deleted' });
  } catch (error) {
    next(error);
  }
};
