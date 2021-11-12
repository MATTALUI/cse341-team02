const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { compose } = require('compose-middleware');

const User = require('../models/User');
const OrganizationUser = require('../models/OrganizationUser');
const Organization = require('../models/Organization');
const Group = require('../models/Group');

module.exports = {
  setUser: (req, res, next) => {
    res.cookie('user', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg1NDM2N2M1LTk0NWQtNGU1Ni1iMTcyLTM4YjhhOGNlYzc1YyIsImZpcnN0TmFtZSI6Ik1hdHQiLCJpYXQiOjE2MzY2OTIzNzV9.Tn5Jik0NDFNEP9e8Gf4q_6RE__ee85j4EnIwFoRN010');

    // res.clearCookie('user');
    jwt.verify(req.cookies.user, process.env.JWT_SECRET, (err, userData) => {
      if (err) {
        req.user = null;
        res.locals.currentUser = null;

        return next();
      }
      User.findById(userData.id).then(user => {
        req.user = user;
        res.locals.currentUser = user;

        next();
      });
    });
  },

  setUserOrganizations: async (req, res, next) => {
    let userOrganizations = {};
    if (req.user) {
      await req.user.populate({
        path: 'userOrganizations',
        populate: [{
          path: 'organization',
          populate: [
            { path: 'admin' },
            { path: 'groups', populate: 'admins' },
          ],
        }],
      });

      // Convert Organization to ID-based hash for easy lookup
      userOrganizations = req.user.userOrganizations.reduce((userOrgs, { organization }) => {
        userOrgs[organization.id] = organization;

        return userOrgs;
      }, userOrganizations);
    }
    req.userOrganizations = userOrganizations;
    res.locals.userOrganizations = userOrganizations;

    next();
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
