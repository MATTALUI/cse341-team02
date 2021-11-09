const express = require('express');
const PreferencesController = require('../controllers/preferences');
const { enforceUser } = require('../utils/middleware');
const router = express.Router();

///////////////////////////////////////////////////////////////////////////////
// UI ROUTES                                                                 //
///////////////////////////////////////////////////////////////////////////////
router.get('/', PreferencesController.edit);
// router.get('/new', enforceUser, PreferencesController.new);
// router.get('/:preferenceId', PreferencesController.show);
// router.get('/:preferenceId/edit', enforceUser, PreferencesController.edit);

///////////////////////////////////////////////////////////////////////////////
// API ROUTES                                                                //
///////////////////////////////////////////////////////////////////////////////
router.post('/', enforceUser, PreferencesController.update);
// router.post('/:preferenceId', enforceUser, PreferencesController.update);
// router.delete('/:preferenceId', enforceUser, PreferencesController.destroy);

module.exports = router;
