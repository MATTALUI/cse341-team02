const express = require('express');
const MessagesController = require('../controllers/messages');
const { enforceUser } = require('../utils/middleware');
const router = express.Router();

///////////////////////////////////////////////////////////////////////////////
// UI ROUTES                                                                 //
///////////////////////////////////////////////////////////////////////////////
// router.get('/', MessagesController.index);
router.get('/new',  MessagesController.new); //enforceUser,
router.get('/:messageId', MessagesController.show);
// router.get('/:messageId/edit', enforceUser, MessagesController.edit);

///////////////////////////////////////////////////////////////////////////////
// API ROUTES                                                                //
///////////////////////////////////////////////////////////////////////////////
router.post('/', enforceUser, MessagesController.create);
// router.post('/:messageId', enforceUser, MessagesController.update);
// router.delete('/:messageId', enforceUser, MessagesController.destroy);

module.exports = router;
