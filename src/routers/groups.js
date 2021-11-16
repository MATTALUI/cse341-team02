const express = require('express');
const GroupsController = require('../controllers/groups');
const messagesRouter = require('./messages');
const preferencesRouter = require('./preferences');
const { enforceUser } = require('../utils/middleware');
const router = express.Router();

///////////////////////////////////////////////////////////////////////////////
// UI ROUTES                                                                 //
///////////////////////////////////////////////////////////////////////////////
router.get('/', GroupsController.index);
router.get('/new', enforceUser, GroupsController.new);
router.get('/:groupId', GroupsController.show);
router.get('/:groupId/edit', enforceUser, GroupsController.edit);

///////////////////////////////////////////////////////////////////////////////
// API ROUTES                                                                //
///////////////////////////////////////////////////////////////////////////////
router.post('/', enforceUser, GroupsController.create);
router.post('/:groupId', enforceUser, GroupsController.update);
router.delete('/:groupId', enforceUser, GroupsController.destroy);

///////////////////////////////////////////////////////////////////////////////
// RELATIONAL SUBROUTES                                                      //
///////////////////////////////////////////////////////////////////////////////
router.use('/:groupId/messages', messagesRouter);
router.use('/:groupId/messages/new', messagesRouter);
router.use('/:groupId/preferences', preferencesRouter);

module.exports = router;
