const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { logAndSendError } = require('../utils/response');
const {
  mailWithDefaults,
  buildNewUserEmailOptions
} = require('../utils/mailer');

const SALT_ROUNDS = 10;
const JWT_ALGO = 'HS256';
const JWT_SECRET = process.env.JWT_SECRET;

const UsersController = {
  create: async (req, res, next) => {
    // Confirm Password Matches Confirmation
    if (req.body.password !== req.body.confirmPassword) {
      req.flash('danger', 'Password and password confirmation must match.');

      return res.redirect('/auth/signup');
    }

    // Confirm User with email does not exist
    const user = await User.findOne({ 'email.address': req.body.email });
    if (user) {
      req.flash('danger', 'An account with that email address already exists.');

      return res.redirect('/auth/signup');
    }

    // Create the new user
    let newUser;
    try {
      const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);
      delete req.body.password;
      req.body.passwordHash = hash;
      newUser = await User.create({
        ...req.body,
        email: {
          address: req.body.email,
        },
      });
    } catch (e) {
      console.error(e);
      req.flash('danger', 'An account error occured while creating your account.');

      return res.redirect('/auth/signup');
    }

    // Set token
    const token = jwt.sign(newUser.minfo(), JWT_SECRET, { algorithm: JWT_ALGO });
    res.cookie('user', token);

    // Send email
    try {
      const emailResponse = await mailWithDefaults(newUser.email.address, buildNewUserEmailOptions({
        user: newUser,
      }));
      req.flash('success', 'Your account has been created successfully. A confirmation email has been sent to your email address.');
    } catch(e) {
      console.error(e);
      req.flash('danger', 'Your account has been created successfully, but there was an issue confirming your email.');
    }

    return res.redirect('/');
  },
};

module.exports = UsersController;
