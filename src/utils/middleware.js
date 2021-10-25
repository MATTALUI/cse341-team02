const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { compose } = require('compose-middleware');

const User = require('../models/User');

module.exports = {
  setUser: (req, res, next) => {
    jwt.verify(req.cookies.user, process.env.JWT_SECRET, (err, userData) => {
      if (err) {
        req.user = null;
        return next();
      }
      User.findById(userData.id).then(user => {
        req.user = user;
        next();
      });
    });
  },

  preventUser: (req, res, next) => {
    if (req.user) {
      return res.redirect('/');
    }

    next();
  },

  enforceUser: (req, res, next) => {
    if (!req.user) {
      return res.redirect('/');
    }

    next();
  },

  validateSignupPayload: compose([
    body('email').trim().notEmpty().isEmail(),
    body('password').notEmpty().isLength({ min: 8 }),
    body('confirmPassword').notEmpty().isLength({ min: 8 }).custom((confirmPassword, { req }) => {
      if(confirmPassword !== req.body.password){
        throw new Error('Passwords do not match.');
      }

      return true;
    }),
    body('firstName').trim().notEmpty(),
    body('lastName').trim().notEmpty(),
    (req, res, next) => {
      const { errors } = validationResult(req);
      if (errors.length) {
        req.flash('danger', `Unable to sign up. Please ensure all fields are filled out and try again.`);

        return res.redirect('/auth/signup');
      }

      next();
    },
  ]),
};
