const express = require('express');
const GroupsController = require('../controllers/groups');
const messagesRouter = require('./messages');
const preferencesRouter = require('./preferences');
const { enforceUser, validateGroupId } = require('../utils/middleware');
const router = express.Router();

///////////////////////////////////////////////////////////////////////////////
// UI ROUTES                                                                 //
///////////////////////////////////////////////////////////////////////////////
router.get('/', GroupsController.index);
router.get('/new', enforceUser, GroupsController.new);
router.get('/:groupId', validateGroupId, GroupsController.show);
router.get('/:groupId/edit', enforceUser, validateGroupId, GroupsController.edit);

///////////////////////////////////////////////////////////////////////////////
// API ROUTES                                                                //
///////////////////////////////////////////////////////////////////////////////
router.post('/', enforceUser, GroupsController.create);
router.post('/:groupId', enforceUser, validateGroupId, GroupsController.update);
router.delete('/:groupId', enforceUser, validateGroupId, GroupsController.destroy);

///////////////////////////////////////////////////////////////////////////////
// RELATIONAL SUBROUTES                                                      //
///////////////////////////////////////////////////////////////////////////////
router.use('/:groupId/messages', validateGroupId, messagesRouter);
router.use('/:groupId/preferences', validateGroupId, preferencesRouter);

module.exports = router;
