const express = require('express');
const UsersController = require('../controllers/users');
const { enforceUser, preventUser, validateSignupPayload, enforceSelf, unconfirmedUserNumbersOnly } = require('../utils/middleware');
const router = express.Router();

///////////////////////////////////////////////////////////////////////////////
// UI ROUTES                                                                 //
///////////////////////////////////////////////////////////////////////////////
router.get('/:userId', preventUser, UsersController.show);
router.get('/:userId/contact-methods', enforceUser, enforceSelf, UsersController.contactMethods);
router.get('/:userId/phone-numbers/:phoneIndex/confirm', enforceUser, enforceSelf, unconfirmedUserNumbersOnly, UsersController.confirmNumber);


///////////////////////////////////////////////////////////////////////////////
// API ROUTES                                                                //
///////////////////////////////////////////////////////////////////////////////
router.post('/', preventUser, validateSignupPayload, UsersController.create);
router.get('/:userId/confirm-email', UsersController.confirmEmail);
router.post('/:userId/contact-methods', enforceUser, enforceSelf, UsersController.updateContactMethods);
router.post('/:userId/phone-numbers/:phoneIndex/confirm', enforceUser, enforceSelf, unconfirmedUserNumbersOnly, UsersController.ajaxConfirmNumber);
router.post('/:userId/phone-numbers/:phoneIndex/send-code', enforceUser, enforceSelf, unconfirmedUserNumbersOnly, UsersController.ajaxSendPhoneConfirmatonCode);

module.exports = router;
