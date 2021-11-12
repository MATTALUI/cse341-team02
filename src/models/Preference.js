const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const EmailSchema = require('./Email');
const PhoneSchema = require('./Phone');
const { LazyUser, LazyGroup } = require('./LazyModels');

///////////////////////////////////////////////////////////////////////////////
// Model Definition                                                          //
///////////////////////////////////////////////////////////////////////////////
const PreferenceSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4, },
  user: {
    type: String,
    ref: 'User',
    required: true
  },
  group: {
    type: String,
    ref: 'Group',
    required: true
  },
  emails: [EmailSchema],
  phoneNumbers: [PhoneSchema],
},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

const Preference = mongoose.model('Preference', PreferenceSchema);


///////////////////////////////////////////////////////////////////////////////
// Instance Methods                                                          //
///////////////////////////////////////////////////////////////////////////////
Preference.prototype.toString = function() {
  const User = LazyUser();
  const Group = LazyGroup();

  return `<Preference::${new User(this.user).toString()}::${new Group(this.group).toString()}>`;
};

module.exports = Preference;
