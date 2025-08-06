const express = require('express');
const router = express.Router();
const feedbackCtrl = require('../controllers/feedback.controller');
const authenticateJWT = require('../middlewares/authenticateJWT');
const authorizeRoles = require('../middlewares/authorizeRoles');

// Patient creates feedback
router.post('/', authenticateJWT, authorizeRoles('patient'), feedbackCtrl.createFeedback);

// Doctors/patients/admin fetch feedback
router.get('/', authenticateJWT, authorizeRoles('doctor', 'patient', 'admin'), feedbackCtrl.getFeedback);

module.exports = router;
