const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { compose } = require('compose-middleware');

const User = require('../models/User');
const OrganizationUser = require('../models/OrganizationUser');
const Organization = require('../models/Organization');
const Group = require('../models/Group');

module.exports = {
  setUser: async (req, res, next) => {
    const user = await User.findOne();
    req.user = user;
    res.locals.currentUser = user;
    return next();
    
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

  setAdminGroups: async (req, res, next) => {
    req.adminGroups = [];
    if (req.user) {
      req.adminGroups = await Group.find({ admins: req.user });
    }
    res.locals.adminGroups = req.adminGroups;

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
      return res.redirect('/auth/login');
    }

    next();
  },

  enforceOrgAdmin: async (req, res, next) => {
    const organization = await Organization.findById(req.params.organizationId);
    if (organization.admin !== req.user.id) {
      return res.redirect('/');
    }

    next();
  },

  enforceGroupAdmin: async (req, res, next) => {
    const group = await Group.findById(req.params.groupId).populate('organization');
    let isAdmin = !!group.admins.find(adminId => adminId === req.user.id);
    isAdmin = isAdmin || group.organization.admin.id === req.user.id;

    if (!isAdmin) {
      return res.redirect('/');
    }

    next();
  },

  validateGroupId: async (req, res, next) => {
    if (req.params.groupId) {
      const group = await Group.findById(req.params.groupId);
      if (!group) {
        return res.redirect('/');
      }
    }

    next();
  },

  enforceSelf: (req, res, next) => {
    if (req.user.id !== req.params.userId){
      return res.redirect('/');
    }

    next();
  },

  unconfirmedUserNumbersOnly: (req, res, next) => {
    const phone = req.user.phoneNumbers[req.params.phoneIndex];
    if (phone.valid) {
      return res.redirect(`/users/${req.user.id}/contact-methods`);
    }

    next();
  },

  sanitizeContactMethods: (req, res, next) => {
    // Sanitize Emails
    // This only protects against cases where someone got fishy in the client
    req.body.emails = req.body.emails || [req.user.email.address];
    // If they save with only one value for emails, it comes through as a string
    // and not an array of values
    if (!Array.isArray(req.body.emails)) {
      req.body.emails = [req.body.emails];
    }

    // Sanitize Phone Numbers
    req.body.phoneNumbers = req.body.phoneNumbers || [];
    // Same issue if one value is submitted as emails
    if (!Array.isArray(req.body.phoneNumbers)) {
      req.body.phoneNumbers = [req.body.phoneNumbers];
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

  validateOrganizationPayload: compose([
    body('name').trim().notEmpty(),
    body('description').trim(),
    (req, res, next) => {
      const { errors } = validationResult(req);
      if (errors.length) {
        req.flash('danger', `There was an error saving the organization. Please ensure all fields are filled out and try again.`);

        return res.redirect('/organizations/new');
      }

      next();
    },
  ]),

  validateMessagePayload: compose([
    body('body').trim().notEmpty(),
    (req, res, next) => {
      const { errors } = validationResult(req);
      if (errors.length) {
        req.flash('danger', `There was an Error saving your message, please make sure there is a message.`);

        return res.redirect(`/groups/${req.params.groupId}/messages/new`);
      }

      next();
    },
  ]),

  validateGroupPayload: compose([
    body('name').trim().notEmpty(),
    body('description').trim(),
    body('organizationId').trim(), // This comes from the form or the url. Might be an issue?
    body('private').trim().isIn(['true', 'false']),
    (req, res, next) => {
      const { errors } = validationResult(req);
      if (errors.length) {
        req.flash('danger', `There was an error saving the group. Please ensure all fields are filled out and try again.`);

        return res.redirect(`${req.params.organizationId ? '/organizations/' + req.params.organizationId : ''}/group/new`);
      }

      next();
    },
  ]),
};
