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
      .filter(message => !selectedGroup || message.group === selectedGroup.id)
      .sort((ma, mb) => mb.createdAt - ma.createdAt);
    await Promise.all(messages.map(async m => {
      await m.populate('poster')
      await m.populate('group');
    }));
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
      organizations = await Organization.find({ admin: req.user.id });
    }

    return res.render('groups/new-group', {
      group,
      organizations,
      organization,
      csrfToken: req.csrfToken()
    });
  },
  update: async (req, res, next) => {
    const group = await Group.findById(req.params.groupId);
    await group.update(req.body);

    req.flash('success', `${group.toString()} group has been successfully updated.`);

    return res.redirect('/groups');
  },
  edit: async (req, res, next) => {
    const group = await Group.findById(req.params.groupId).populate('organization');

    return res.render('groups/new-group', {
      group,
      organization: group.organization,
      organizations: [],
      csrfToken: req.csrfToken(),
    });
  },
  destroy: async (req, res, next) => {
    const group = await Group.findByIdAndRemove(req.params.groupId);
    req.flash('success', `${group.toString()} group has been successfully deleted.`);

    // NOTE: This method gets hit with AJAX, so it make more sense to send back data.
    return res.send(group);
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
    const group = await Group.findById(req.params.groupId).populate('admins');
    const user = await User.findOne({ 'email.address': req.body.email });
    // First, make sure they're not already an admin
    const admin = group.admins.find(a => a.email.address === req.body.email );
    if (!admin) {
      group.admins.push(user);
      await group.save();
    }

    return res.send({
      result: user && !admin ? user : null,
    });
  },
  removeAdmin: async (req, res, next) => {
    const group = await Group.findById(req.params.groupId).populate('admins');
    const user = await User.findOne({ 'email.address': req.body.email });
    group.admins = group.admins.filter(a => a.email.address !== user.email.address);
    // NOTE: We don't want any groups without admins hanging around...
    if (group.admins.length > 0) {
      await group.save();

      return res.send({
        result: user,
      });
    } else {
      return res.send({
        result: null
      });
    }
  },
};

module.exports = GroupController;
