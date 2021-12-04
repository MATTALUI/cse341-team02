const express = require('express');
const OrganizationsController = require('../controllers/organizations');
const GroupsController = require('../controllers/groups');
const {
  enforceUser,
  validateOrganizationPayload,
  enforceOrgAdmin,
  validateGroupPayload
} = require('../utils/middleware');
const router = express.Router();

///////////////////////////////////////////////////////////////////////////////
// UI ROUTES                                                                 //
///////////////////////////////////////////////////////////////////////////////
router.get('/', enforceUser, OrganizationsController.index);
router.get('/new', enforceUser, OrganizationsController.new);
// router.get('/:organizationId', OrganizationsController.show);
router.get('/:organizationId/edit', enforceUser, enforceOrgAdmin, OrganizationsController.edit);

///////////////////////////////////////////////////////////////////////////////
// API ROUTES                                                                //
///////////////////////////////////////////////////////////////////////////////
router.post('/', enforceUser, validateOrganizationPayload, OrganizationsController.create);
router.get('/:organizationId/join', enforceUser, OrganizationsController.join);
router.get('/:organizationId/leave', enforceUser, OrganizationsController.leave);
router.post('/:organizationId', enforceUser, validateOrganizationPayload, OrganizationsController.update);
router.delete('/:organizationId', enforceUser, enforceOrgAdmin, OrganizationsController.destroy);

///////////////////////////////////////////////////////////////////////////////
// RELATIONAL SUBROUTES                                                      //
///////////////////////////////////////////////////////////////////////////////
router.get('/:organizationId/groups/new', enforceUser, enforceOrgAdmin, GroupsController.new);
router.post('/:organizationId/groups', enforceUser, enforceOrgAdmin, validateGroupPayload, GroupsController.create);

module.exports = router;
