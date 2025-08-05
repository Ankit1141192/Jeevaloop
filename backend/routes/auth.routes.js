const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const router = express.Router();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: process.env.EMAIL_USER,      
    pass: process.env.EMAIL_PASS,       
  },
});

// Signup a new user
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({ msg: 'Signup successful', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login user and generate JWT
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ msg: 'Login successful', token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Forgot password: generate reset token & send email
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: 'User not found with that email' });

    // Create reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour expiry

    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const mailOptions = {
  from: process.env.EMAIL_USER,
  to: email,
  subject: 'Reset Your Password | Jeevaloop Hospital Management',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #2f855a;">🔒 Password Reset Request</h2>
      <p>Hello,</p>
      <p>We received a request to reset your password for your <strong>Jeevaloop Hospital Management</strong> account.</p>
      <p>Click the button below to securely reset your password:</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${resetUrl}" style="background-color: #2f855a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px;">Reset Password</a>
      </div>
      <p>This link is valid for <strong>1 hour</strong>. If you did not request a password reset, please ignore this email or contact our support team.</p>
      <hr style="margin-top: 30px;" />
      <p style="font-size: 14px; color: #777;">Regards,<br>Team Jeevaloop</p>
      <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply to this email.</p>
    </div>
  `
};


    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).json({ msg: 'Failed to send email' });
      }
      res.json({ msg: 'Reset link sent to your email' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Reset password using token from URL
router.post('/reset-password/:token', async (req, res) => {
  try {
    const resetPassToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken: resetPassToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ msg: 'Invalid or expired token' });

    // Hash new password and save
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    user.password = hashedPassword;

    // Clear reset token and expiry fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ msg: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
