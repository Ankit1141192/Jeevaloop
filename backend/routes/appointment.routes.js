const express = require('express');
const router = express.Router();
const appointmentCtrl = require('../controllers/appointment.controller');
const authenticateJWT = require('../middlewares/authenticateJWT');
const authorizeRoles = require('../middlewares/authorizeRoles');

router.post('/', authenticateJWT, authorizeRoles('patient'), appointmentCtrl.createAppointment);
router.get('/', authenticateJWT, authorizeRoles('doctor', 'patient', 'admin'), appointmentCtrl.getAppointments);
router.put('/:id', authenticateJWT, authorizeRoles('doctor', 'admin'), appointmentCtrl.updateStatus);
router.delete('/:id', authenticateJWT, appointmentCtrl.deleteAppointment);

module.exports = router;
