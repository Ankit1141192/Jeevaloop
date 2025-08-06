const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');

// Configure nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Signup controller
const signupControllers = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({ msg: 'Signup successful', user: newUser });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Login controller
const loginControllers = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Sign JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ msg: 'Login successful', token, user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Forgot password controller
const forgotPasswordControllers = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: 'User not found with that email' });

    // Generate reset token (unhashed)
    const resetToken = crypto.randomBytes(32).toString('hex');
    // Hash the token before saving to DB
    const resetTokenHash = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set reset token and expiry on user model
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour expiry

    await user.save();

    // Create frontend reset URL with unhashed token
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Your Password - Jeevaloop Hospital Management',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #271d5c">Password Reset Request</h2>
          <p>Hello ${user.name},</p>
          <p>We received a request to reset your password for your <strong>Jeevaloop Hospital Management</strong> account.</p>
          <p>Click the button below to securely reset your password:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${resetUrl}" style="background-color: #b8a6ff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px;">Reset Password</a>
          </div>
          <p>This link is valid for <strong>1 hour</strong>. If you did not request a password reset, please ignore this email or contact our support team.</p>
          <hr style="margin-top: 30px;" />
          <p style="font-size: 14px; color: #777;">Regards,<br>Team Jeevaloop</p>
          <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply to this email.</p>
        </div>
      `,
    };

    // Send reset email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).json({ msg: 'Failed to send email' });
      }
      res.json({ msg: 'Reset link sent to your email' });
    });
  } catch (error) {
    console.error('Forgot Password error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Reset password controller
const resetPasswordControllers = async (req, res) => {
  try {
    // Extract token from URL params
    const { token } = req.params;

    if (!token)
      return res.status(400).json({ msg: 'Reset token is required' });

    // Hash the token to match stored hash in DB
    const resetPassToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with valid token and expiry
    const user = await User.findOne({
      resetPasswordToken: resetPassToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ msg: 'Invalid or expired token' });

    const { password } = req.body;

    if (!password || password.trim().length < 6) {
      return res.status(400).json({ msg: 'Password must be at least 6 characters' });
    }

    // Hash new password and update
    user.password = await bcrypt.hash(password, 8);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ msg: 'Password reset successful' });
  } catch (error) {
    console.error('Reset Password error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  signupControllers,
  loginControllers,
  forgotPasswordControllers,
  resetPasswordControllers,
};
