const express = require('express');
const OrganizationsController = require('../controllers/organizations');
const { enforceUser } = require('../utils/middleware');
const router = express.Router();

///////////////////////////////////////////////////////////////////////////////
// UI ROUTES                                                                 //
///////////////////////////////////////////////////////////////////////////////
router.get('/', enforceUser, OrganizationsController.index);
router.get('/new', enforceUser, OrganizationsController.new);
router.get('/:organizationId', OrganizationsController.show);
router.get('/:organizationId/edit', enforceUser, OrganizationsController.edit);

///////////////////////////////////////////////////////////////////////////////
// API ROUTES                                                                //
///////////////////////////////////////////////////////////////////////////////
router.post('/', enforceUser, OrganizationsController.create);
router.get('/:organizationId/join', enforceUser, OrganizationsController.join);
router.get('/:organizationId/leave', enforceUser, OrganizationsController.leave);
router.post('/:organizationId', enforceUser, OrganizationsController.update);
router.delete('/:organizationId', enforceUser, OrganizationsController.destroy);

module.exports = router;
