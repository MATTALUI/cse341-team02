const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const User = require('./User');
const Group = require('./Group');
const EmailSchema = require('./Email');
const PhoneSchema = require('./Phone');

///////////////////////////////////////////////////////////////////////////////
// Model Definition                                                          //
///////////////////////////////////////////////////////////////////////////////
const PreferenceSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4, },
  user: { type: User.schema, required: true },
  group: { type: Group.schema, required: true },
  emails: [EmailSchema],
  phoneNumbers: [PhoneSchema],
},{
  timestamps: true,
});

const Preference = mongoose.model('Preference', PreferenceSchema);


///////////////////////////////////////////////////////////////////////////////
// Instance Methods                                                          //
///////////////////////////////////////////////////////////////////////////////
Preference.prototype.toString = function() {
  return `<Preference::${new User(this.user).toString()}::${new Group(this.group).toString()}>`;
};

module.exports = Preference;
