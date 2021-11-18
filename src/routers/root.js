const express = require('express');
const GroupsController = require('../controllers/groups');
const { enforceUser } = require('../utils/middleware');
const router = express.Router();

///////////////////////////////////////////////////////////////////////////////
// UI ROUTES                                                                 //
///////////////////////////////////////////////////////////////////////////////
router.get('/', /*enforceUser,*/ GroupsController.show);


module.exports = router;
