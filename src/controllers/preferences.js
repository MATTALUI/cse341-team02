const Group = require('../models/Group');
const Preference = require('../models/Preference');

const PreferencesController = {
  // index: async (req, res, next) => {
  //   return res.send(`GET /groups/${req.params.groupId}/preferences [index]`);
  // },
  // show: async (req, res, next) => {
  //   return res.send(`GET /groups/${req.params.groupId}/preferences/${req.params.preferenceId} [show]`);
  // },
  // create: async (req, res, next) => {
  //   return res.send(`POST /groups/${req.params.groupId}/preferences [create]`);
  // },
  // new: async (req, res, next) => {
  //   return res.send(`GET /groups/${req.params.groupId}/new [new]`);
  // },
  update: async (req, res, next) => {
    // We do a sort of upsert here.
    const group = await Group.findById(req.params.groupId);
    let preference = await Preference.findOne({
      group,
      user: req.user,
    });
    if (!preference) {
      // TODO: refactor this into som sort of upsert logic
      preference = await Preference.create({
        group,
        user: req.user,
      });
    }
    const emails = new Array(req.body.emails)
      .filter(v => !!v)
      .flat()
      .map(email => req.user.emailForAddress(email))
      .filter(({valid}) => valid);
    const phoneNumbers = new Array(req.body.phoneNumbers)
      .filter(v => !!v)
      .flat()
      .map(number => req.user.phoneForNumber(number))
      .filter(({valid}) => valid);

    preference.emails = emails;
    preference.phoneNumbers = phoneNumbers;


    await preference.save();
    req.flash('success', 'You Preferences for this group have been successfully updated.');

    return res.redirect(`/groups/${group.id}`);
  },
  edit: async (req, res, next) => {
    const group = await Group.findById(req.params.groupId);
    let preference = await Preference.findOne({
      group,
      user: req.user,
    });
    if (!preference) {
      // TODO: refactor this into som sort of upsert logic
      preference = await Preference.create({
        group,
        user: req.user,
      });
    }


    return res.render('preferences/form', {
      group,
      preference,
      csrfToken: req.csrfToken(),
    });
  },
  // },
  // destroy: async (req, res, next) => {
  //   return res.send(`DELETE /groups/${req.params.groupId}/preferences/${req.params.preferenceId} [destroy]`);
  // },
};

module.exports = PreferencesController;
