const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { logAndSendError } = require('../utils/response');
const { mailWithDefaults } = require('../utils/mailer');

const SALT_ROUNDS = 10;
const JWT_ALGO = 'HS256';
const JWT_SECRET = process.env.JWT_SECRET;

const UsersController = {
  create: (req, res, next) => {
    if (req.body.password !== req.body.confirmPassword) {
      req.flash('danger', 'Password and password confirmation must match.');

      return res.redirect('/auth/signup');
    }

    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        req.flash('danger', 'An account with that email address already exists.');

        return res.redirect('/auth/signup');
      }
      bcrypt.hash(req.body.password, SALT_ROUNDS).then(hash => {
        delete req.body.password;
        req.body.passwordHash = hash;
        User.create(req.body).then(user => {
          jwt.sign(user.minfo(), JWT_SECRET, { algorithm: JWT_ALGO }, (err, token) => {
            mailWithDefaults(user.email, (err, info) => {
              if (err) {
                console.error(err);
                req.flash('danger', 'Your account has been created successfully, but there was an issue confirming your email.');
              } else {
                req.flash('success', 'Your account has been created successfully. A confirmation email has been sent to your email address.');
              }
              res.cookie('user', token);
              res.redirect('/');
            }, {
              subject: 'Welcome to mhummer-cse341-bookstore.herokuapp.com!',
              text: 'An account for your email has been created at https://mhummer-cse341-bookstore.herokuapp.com',
              html: '<p>An account for your email has been created at https://mhummer-cse341-bookstore.herokuapp.com. <a href="https://mhummer-cse341-bookstore.herokuapp.com/auth/login">Login to buy books today!</a></p>',
            });
          });
        }).catch(logAndSendError(res));
      }).catch(logAndSendError(res));
    });

  },
};

module.exports = UsersController;
