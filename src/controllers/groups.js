const Group = require('../models/Group');

const GroupController = {
  index: async (req, res, next) => {
    const groups = Object
      .values(req.userOrganizations)
      .map(org => org.groups)
      .flat();

    return res.render('groups/index', {
      groups,
    });
  },
  show: async (req, res, next) => {
    const group = await Group.findById(req.params.groupId).populate('messages');

    return res.render('groups/show', {
      group,
    });
  },
  create: async (req, res, next) => {
    const group = await Group.create({
      ...req.body,
      admins: [req.user],
      organization: { _id: req.body.organizationId },
    });
    req.flash('success', `${group.toString()} group has been successfully created.`);

    return res.redirect('/groups');
  },
  new: async (req, res, next) => {
    const group = new Group();

    return res.render('groups/form', {
      group,
    });
  },
  update: async (req, res, next) => {
    const group = await Group.findById(req.params.groupId).update(req.body);
    req.flash('success', `${group.toString()} group has been successfully updated.`);

    return res.redirect('/groups');
  },
  edit: async (req, res, next) => {
    const group = Group.findById(req.params.groupId);

    return res.render('groups/form', {
      group,
    });
  },
  destroy: async (req, res, next) => {
    const group = await Group.findOneAndDelete(req.params.groupId);
    req.flash('success', `${group.toString()} group has been successfully deleted.`);

    return res.redirect('/groups');
  },
};

module.exports = GroupController;
