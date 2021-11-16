const express = require('express');
const UsersController = require('../controllers/users');
const { enforceUser, preventUser, validateSignupPayload } = require('../utils/middleware');
const router = express.Router();

///////////////////////////////////////////////////////////////////////////////
// UI ROUTES                                                                 //
///////////////////////////////////////////////////////////////////////////////
router.get('/:userId', preventUser, UsersController.show);


///////////////////////////////////////////////////////////////////////////////
// API ROUTES                                                                //
///////////////////////////////////////////////////////////////////////////////
router.post('/', preventUser, validateSignupPayload, UsersController.create);
router.get('/:userId/confirm-email', UsersController.confirmEmail);

module.exports = router;
