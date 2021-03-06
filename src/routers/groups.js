const express = require('express');
const GroupsController = require('../controllers/groups');
const messagesRouter = require('./messages');
const preferencesRouter = require('./preferences');
const {
  enforceUser,
  validateGroupId,
  validateGroupPayload,
  enforceGroupAdmin
} = require('../utils/middleware');
const router = express.Router();

///////////////////////////////////////////////////////////////////////////////
// UI ROUTES                                                                 //
///////////////////////////////////////////////////////////////////////////////
router.get('/', GroupsController.index);
router.get('/new', enforceUser, GroupsController.new);
router.get('/:groupId', validateGroupId, GroupsController.show);
router.get('/:groupId/edit', enforceUser, validateGroupId, GroupsController.edit);
router.get('/:groupId/admins', validateGroupId, enforceGroupAdmin, GroupsController.admins);

///////////////////////////////////////////////////////////////////////////////
// API ROUTES                                                                //
///////////////////////////////////////////////////////////////////////////////
router.post('/', enforceUser, validateGroupPayload, GroupsController.create);
router.post('/:groupId', enforceUser, validateGroupId, GroupsController.update);
router.delete('/:groupId', enforceUser, validateGroupId, GroupsController.destroy);
router.get('/:groupId/admins/search', enforceUser, GroupsController.searchAdmins);
router.post('/:groupId/admins', enforceUser, GroupsController.addAdmin);
router.delete('/:groupId/admins', enforceUser, GroupsController.removeAdmin);

///////////////////////////////////////////////////////////////////////////////
// RELATIONAL SUBROUTES                                                      //
///////////////////////////////////////////////////////////////////////////////
router.use('/:groupId/messages', validateGroupId, messagesRouter);
router.use('/:groupId/preferences', validateGroupId, preferencesRouter);

module.exports = router;
