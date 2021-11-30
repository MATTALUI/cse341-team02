const express = require('express');
const UsersController = require('../controllers/users');
const { enforceUser, preventUser, validateSignupPayload, enforceSelf } = require('../utils/middleware');
const router = express.Router();

///////////////////////////////////////////////////////////////////////////////
// UI ROUTES                                                                 //
///////////////////////////////////////////////////////////////////////////////
router.get('/:userId', preventUser, UsersController.show);
router.get('/:userId/contact-methods', enforceUser, enforceSelf, UsersController.contactMethods);


///////////////////////////////////////////////////////////////////////////////
// API ROUTES                                                                //
///////////////////////////////////////////////////////////////////////////////
router.post('/', preventUser, validateSignupPayload, UsersController.create);
router.get('/:userId/confirm-email', UsersController.confirmEmail);
router.post('/:userId/contact-methods', enforceUser, enforceSelf, UsersController.updateContactMethods);

module.exports = router;
