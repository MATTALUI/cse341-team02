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
    // TODO: update emails and phoneNumbers; not sure what body is yet
    await preference.save();
    req.flash('success', 'You Preferences for this group have been successfully updated.');

    return res.redirect('/');
  },
  edit: async (req, res, next) => {
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
      preference,
    });
  },
  // },
  // destroy: async (req, res, next) => {
  //   return res.send(`DELETE /groups/${req.params.groupId}/preferences/${req.params.preferenceId} [destroy]`);
  // },
};

module.exports = PreferencesController;
