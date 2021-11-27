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
  emails: {
    type: [EmailSchema],
    default: [],
  },
  phoneNumbers: {
    type: [PhoneSchema],
    default: [],
  },
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

Preference.prototype.validEmails = function() {
  return this.emails.filter(({ valid}) => valid).map(({ address}) => address);
};

Preference.prototype.validPhones = function(){
  return this.phoneNumbers.filter(p => p.valid).map(p => p.number);
};

Preference.prototype.hasNumber = function(phoneNumber) {
  // NOTE: Currently we're only checking valid phone numbers because they're the
  // only type we should actually have stored in here. This is subject to change.
  const number = this.validPhones().find(p => p === phoneNumber) || null;

  return !!number;
}

Preference.prototype.hasEmailAddress = function(emailAddress) {
  // NOTE: Currently we're only checking valid email addresses because they're the
  // only type we should actually have stored in here. This is subject to change.
  const email = this.validEmails().find(e => e === emailAddress) || null;

  return !!email;
}

module.exports = Preference;
