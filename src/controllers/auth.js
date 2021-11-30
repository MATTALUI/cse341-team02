const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { logAndSendError } = require('../utils/response');
const JWT_ALGO = 'HS256';
const JWT_SECRET = process.env.JWT_SECRET;

const AuthController = {
  login: (req, res, next) => {
    res.render('auth/login', {
      currentUser: req.user,
      csrfToken: req.csrfToken(),
    });
  },
  signup: (req, res, next) => {
    res.render('auth/signup', {
      currentUser: req.user,
      csrfToken: req.csrfToken(),
    });
  },
  logout: (req, res, next) => {
    req.flash('success', `Come back soon!`);
    res.clearCookie('user');
    res.redirect('/');
  },
  authenticate: (req, res, next) => {
    User.findOne({ "email.address": req.body.email }).then(user => {
      if (!user) {
        req.flash('danger', 'Incorrect email or password.');
        return res.redirect('/auth/login');
      }
      bcrypt.compare(req.body.password, user.passwordHash, function(err, result) {
        if (err || !result) {
          req.flash('danger', 'Incorrect email or password.');
          return res.redirect('/auth/login');
        }
        jwt.sign(user.minfo(), JWT_SECRET, { algorithm: JWT_ALGO }, (err, token) => {
          req.flash('success', `Welcome back, ${user.toString()}`);
          res.cookie('user', token);
          res.redirect('/');
        });
      });
    }).catch(logAndSendError(res));
  },
};

module.exports = AuthController;
