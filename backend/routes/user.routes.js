const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const authenticateJWT = require('../middlewares/authenticateJWT');

router.get('/me', authenticateJWT, userCtrl.getProfile);
router.put('/me', authenticateJWT, userCtrl.updateProfile);

module.exports = router;
