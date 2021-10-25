const express = require('express');
const AuthController = require('../controllers/auth');
const UsersController = require('../controllers/users');
const { enforceUser, preventUser, validateSignupPayload } = require('../utils/middleware');
const router = express.Router();

///////////////////////////////////////////////////////////////////////////////
// UI ROUTES                                                                 //
///////////////////////////////////////////////////////////////////////////////
router.get('/login', preventUser, AuthController.login);
router.get('/signup', preventUser, AuthController.signup);
router.get('/logout', enforceUser, AuthController.logout);

///////////////////////////////////////////////////////////////////////////////
// API ROUTES                                                                //
///////////////////////////////////////////////////////////////////////////////
router.post('/login', preventUser, AuthController.authenticate);
router.post('/signup', preventUser, validateSignupPayload, UsersController.create);

module.exports = router;
