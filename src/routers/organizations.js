const express = require('express');
const OrganizationsController = require('../controllers/organizations');
const GroupsController = require('../controllers/groups');
const {
  enforceUser,
  validateOrganizationPayload,
  enforceOrgAdmin,
  validateGroupPayload,
  validateOrgId
} = require('../utils/middleware');
const router = express.Router();

///////////////////////////////////////////////////////////////////////////////
// UI ROUTES                                                                 //
///////////////////////////////////////////////////////////////////////////////
router.get('/', enforceUser, OrganizationsController.index);
router.get('/new', enforceUser, OrganizationsController.new);
// router.get('/:organizationId', OrganizationsController.show);
router.get('/:organizationId/edit', enforceUser, validateOrgId, enforceOrgAdmin, OrganizationsController.edit);

///////////////////////////////////////////////////////////////////////////////
// API ROUTES                                                                //
///////////////////////////////////////////////////////////////////////////////
router.post('/', enforceUser, validateOrganizationPayload, OrganizationsController.create);
router.get('/:organizationId/join', enforceUser, validateOrgId, OrganizationsController.join);
router.get('/:organizationId/leave', enforceUser, validateOrgId, OrganizationsController.leave);
router.post('/:organizationId', enforceUser, validateOrgId, validateOrganizationPayload, OrganizationsController.update);
router.delete('/:organizationId', enforceUser, validateOrgId, enforceOrgAdmin, OrganizationsController.destroy);

///////////////////////////////////////////////////////////////////////////////
// RELATIONAL SUBROUTES                                                      //
///////////////////////////////////////////////////////////////////////////////
router.get('/:organizationId/groups/new', enforceUser, validateOrgId, enforceOrgAdmin, GroupsController.new);
router.post('/:organizationId/groups', enforceUser, validateOrgId, enforceOrgAdmin, validateGroupPayload, GroupsController.create);

module.exports = router;
