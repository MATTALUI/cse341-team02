const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const User = require('./User');
const Organization = require('./Organization');
const Preference = require('./Preference');
// console.log(Preference);

///////////////////////////////////////////////////////////////////////////////
// Model Definition                                                          //
///////////////////////////////////////////////////////////////////////////////
const GroupSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4, },
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  admins: [User.schema],
  organization: { type: Organization.schema, required: true },
  private: { type: Boolean, default: false },
},{
  timestamps: true,
});

const Group = mongoose.model('Group', GroupSchema);


///////////////////////////////////////////////////////////////////////////////
// Instance Methods                                                          //
///////////////////////////////////////////////////////////////////////////////
Group.prototype.toString = function() {
  return this.name;
};

Group.prototype.allSubscriberPreferences = async function() {
  console.log(Preference);
  // const preferences = await Preference.find({ 'group._id': this.id });
  //
  // return preferences;
};

module.exports = Group;
