const Group = require('../models/Group');
const Preference = require('../models/Preference');

const PreferencesController = {
  update: async (req, res, next) => {
    // We do a sort of upsert here.
    const group = await Group.findById(req.params.groupId);
    const preference = await Preference.findOneOrCreate({
      user: req.user,
      group,
    });
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
    const preference = await Preference.findOneOrCreate({
      user: req.user,
      group,
    });

    return res.render('preferences/form', {
      group,
      preference,
      csrfToken: req.csrfToken(),
    });
  },
};

module.exports = PreferencesController;
