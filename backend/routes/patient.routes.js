const express = require('express');
const router = express.Router();
const patientCtrl = require('../controllers/patient.controller');
const authenticateJWT = require('../middlewares/authenticateJWT');
const authorizeRoles = require('../middlewares/authorizeRoles');

// Create or update a patient record - doctor, admin only
router.post('/', authenticateJWT, authorizeRoles('doctor', 'admin'), patientCtrl.createOrUpdatePatient);

// Get patient record - doctors/admin get any, patient gets own only
router.get('/:id?', authenticateJWT, patientCtrl.getPatient);

// Delete patient record - doctor/admin only
router.delete('/:id', authenticateJWT, authorizeRoles('doctor', 'admin'), patientCtrl.deletePatient);

module.exports = router;
