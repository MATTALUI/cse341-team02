const Organization = require('../models/Organization');
const OrganizationUser = require('../models/OrganizationUser');

const OrganizationsController = {
  index: async (req, res, next) => {
    const organizations = await Organization.find();

    return res.render('organizations/index', {
      organizations,
      csrfToken: req.csrfToken(),
    });
  },
  show: async (req, res, next) => {
    const organization = await Organization
      .findById(req.params.organizationId);

    return res.render('organizations/show', {
      organization,
      csrfToken: req.csrfToken(),
    });
  },
  create: async (req, res, next) => {
    const organization = await Organization.create({
      ...req.body,
      admin: req.user,
    });
    req.flash('success', `${organization.toString()} organization has been successfully created.`);

    return res.redirect('/organizations');
  },
  new: async (req, res, next) => {
    const organization = new Organization();

    return res.render('organizations/form', {
      organization,
      csrfToken: req.csrfToken(),
    });
  },
  update: async (req, res, next) => {
    const organization = await Organization.findById(req.params.organizationId)
    await organization.update(req.body);
    req.flash('success', `${organization.toString()} organization has been successfully updated.`);

    return res.redirect('/organizations');
  },
  edit: async (req, res, next) => {
    const organization = await Organization.findById(req.params.organizationId);

    return res.render('organizations/form', {
      organization,
      csrfToken: req.csrfToken(),
    });
  },
  destroy: async (req, res, next) => {
    const organization = await Organization.findByIdAndRemove(req.params.organizationId);
    await OrganizationUser.deleteMany({
      organization,
    });

    // NOTE: This method gets hit with AJAX, so it make more sense to send back data.
    return res.send(organization);
  },
  join: async (req, res, next) => {
    const organization = await Organization.findById(req.params.organizationId);
    // TODO: We should confirm a user isn't already a member here.
    await OrganizationUser.create({
      user: req.user,
      organization,
    });
    req.flash('success', `You've successfully joined the ${organization.toString()} organization.`);

    return res.redirect('/organizations');
  },
  leave: async (req, res, next) => {
    const organization = await Organization.findById(req.params.organizationId);
    await OrganizationUser.deleteMany({
      user: req.user,
      organization,
    });
    req.flash('success', `You've successfully left the ${organization.toString()} organization.`);

    return res.redirect('/organizations');
  },
};

module.exports = OrganizationsController;
