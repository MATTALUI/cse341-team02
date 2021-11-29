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
  show: async (req, res, next) => {
    const user = await User.findById(req.params.userId)
    // TODO: We're just doing this for now; add a view later.
    res.send(user);
  },
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

    // Send email
    try {
      const emailResponse = await mailWithDefaults(newUser.email.address, buildNewUserEmailOptions({
        user: newUser,
        email: newUser.email,
      }));

      req.flash('success', 'Your account has been created successfully. A confirmation email has been sent to your email address.');
    } catch(e) {
      console.error(e);
      req.flash('danger', 'Your account has been created successfully, but there was an issue confirming your email.');
    }

    return res.redirect('/');
  },
  confirmEmail: async (req, res, next) => {
    // Getting data from the token also confirms that it's a valid token
    let tokenData;
    try{
      tokenData = jwt.verify(req.query.token, JWT_SECRET, { algorithm: JWT_ALGO });
    } catch(e) {
      return res.redirect('/');
    }

    // Ensure the ID of the data patches the ID of the user path
    if (tokenData.userId !== req.params.userId) {
      return res.redirect('/');
    }

    // Find the user and the corresponding email
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.redirect('/');
    }
    const email = user.emailForAddress(tokenData.address);
    if (!email || email.valid || email.confirmationKey !== tokenData.confirmationKey) {
      return res.redirect('/');
    }

    email.valid = true; // Also mutates the email object on the User
    await user.save();

    req.flash('success', `Your email (${email.address}) has been successfully confirmed.`);
    return res.redirect('/');
  },
  contactMethods: async (req, res, next) => {
    return res.render('users/contact-methods', {
      csrfToken: req.csrfToken(),
    });
  },
  updateContactMethods: async (req, res, next) => {
    const user = await User.findById(req.params.userId);

    // Remove any emails that were removed from the list
    user.extraEmails = user.extraEmails.filter(email => req.body.emails.indexOf(email.address) >= 0);
    // Add any new emails
    req.body.emails.forEach(address => {
      let email = user.emailForAddress(address);
      if (!email) {
        user.extraEmails.push({ address });
        email = user.emailForAddress(address);
        // NOTE: This is async, but for now we're just firing and forgetting.
        // Eventually we'll want to move away from this.
        mailWithDefaults(email.address, buildNewUserEmailOptions({
          user: req.user,
          email,
        }));
      }
    })

    await user.save();

    return res.send(user);
  },
};

module.exports = UsersController;
