const express = require('express');
const MessagesController = require('../controllers/messages');
const { enforceUser, validateMessagePayload } = require('../utils/middleware');
const router = express.Router({ mergeParams: true });

///////////////////////////////////////////////////////////////////////////////
// UI ROUTES                                                                 //
///////////////////////////////////////////////////////////////////////////////
// router.get('/', MessagesController.index);
router.get('/new', enforceUser, MessagesController.new); 
router.get('/:messageId', MessagesController.show);
// router.get('/:messageId/edit', enforceUser, MessagesController.edit);

///////////////////////////////////////////////////////////////////////////////
// API ROUTES                                                                //
///////////////////////////////////////////////////////////////////////////////
router.post('/', enforceUser, validateMessagePayload, MessagesController.create);
// router.post('/:messageId', enforceUser, MessagesController.update);
// router.delete('/:messageId', enforceUser, MessagesController.destroy);

module.exports = router;
