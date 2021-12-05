const Group = require('../models/Group');
const User = require('../models/User');
const Preference = require('../models/Preference');
const Organization = require('../models/Organization');
const OrganizationUser = require('../models/OrganizationUser');

const GroupController = {
  index: async (req, res, next) => {
    // NOTE: We're actually only using this action for admin groups.
    const groups = req.adminGroups;

    return res.render('groups/index', {
      groups,
      csrfToken: req.csrfToken(),
    });
  },
  show: async (req, res, next) => {
    // Note: selectedGroup may be null, since we also use this handler as the
    // root view. Write logic accordingly.
    const selectedGroup = await Group
      .findById(req.params.groupId)
      .populate('messages');
    // Get groups for the navigation aside bar
    const groups = Object
      .values(req.userOrganizations)
      .map(org => org.groups)
      .flat();
    await Promise.all(groups.map(g => g.populate('messages')));
    // Generate the messages that show to users
    const messages = groups
      .map(group => group.messages)
      .flat()
      .filter(message => !selectedGroup || message.group === selectedGroup.id);
    await Promise.all(messages.map(m => m.populate('poster')));
    // Determine the user's preferences for the selected group.
    let preference = null;
    if (selectedGroup) {
      preference = await Preference.findOneOrCreate({
        user: req.user,
        group: selectedGroup,
      });
    }

    return res.render('groups/show', {
      selectedGroup,
      messages,
      preference,
      csrfToken: req.csrfToken(),
    });
  },
  create: async (req, res, next) => {
    const group = await Group.create({
      ...req.body,
      admins: [req.user],
      private: req.body.private === 'true',
      organization: {
        _id: req.params.organizationId || req.body.organizationId,
      },
    });
    req.flash('success', `${group.toString()} group has been successfully created.`);

    return res.redirect('/');
  },
  new: async (req, res, next) => {
    const group = new Group();
    let organizations = [];
    let organization = null;

    if (req.params.organizationId){
      organization = await Organization.findById(req.params.organizationId);
    } else {
      organizations = await Organization.find();
    }


    return res.render('groups/new-group', {
      group,
      organizations,
      organization,
      csrfToken: req.csrfToken()
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
  admins: async (req, res, next) => {
    const group = await Group
      .findById(req.params.groupId)
      .populate('admins');

    return res.render('groups/admin', {
      group,
      csrfToken: req.csrfToken(),
    });
  },
  searchAdmins: async (req, res, next) => {
    const group = await Group.findById(req.params.groupId);
    const user = await User.findOne({ 'email.address': req.query.email });
    const searchResult = await OrganizationUser.findOne({
      organization: group.organization,
      user: user && user.id,
    })
    res.send({
      result: searchResult ? user : null,
    });
  },
  addAdmin: async (req, res, next) => {
    res.send({action: 'addAdmin'});
  },
  removeAdmin: async (req, res, next) => {
    res.send({action: 'removeAdmin'});
  },
};

module.exports = GroupController;
