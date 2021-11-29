const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const EmailSchema = require('./Email');
const PhoneSchema = require('./Phone');
const { mailWithDefaults } = require('../utils/mailer');
const { textWithDefaults } = require('../utils/texter');

///////////////////////////////////////////////////////////////////////////////
// Model Definition                                                          //
///////////////////////////////////////////////////////////////////////////////
const UserSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4, },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: EmailSchema, required: true },
  passwordHash: { type: String, default: '' },
  phoneNumbers: {
    type: [PhoneSchema],
    default: [],
  },
  extraEmails: {
    type: [EmailSchema],
    default: [],
  },   
},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});
UserSchema.virtual('preferences', {
  ref: 'Preference',
  localField: '_id',
  foreignField: 'user'
});
UserSchema.virtual('userOrganizations', {
  ref: 'OrganizationUser',
  localField: '_id',
  foreignField: 'user'
});

const User = mongoose.model('User', UserSchema);


///////////////////////////////////////////////////////////////////////////////
// Instance Methods                                                          //
///////////////////////////////////////////////////////////////////////////////
User.prototype.toString = function() {
  return `${this.firstName} ${this.lastName}`;
};

User.prototype.minfo = function() {
  // Returns the Minimal INFO for a user... Get it?
  return {
    id: this.id,
    firstName: this.firstName,
  };
};

User.prototype.allEmails = function() {
  return [this.email].concat(this.extraEmails);
};

User.prototype.emailForAddress = function(emailAddress) {
  return this.allEmails().find(({ address }) => address === emailAddress) || null;
};

User.prototype.sendMessage = function(message) {
  // NOTE: This may become needed for testing only, as it will not apply well
  // to multiple groups.
  this.validEmails().forEach(email => mailWithDefaults(email, null, {
    text: message.body,
    html: message.body,
  }));
  this.validPhones().forEach(number => textWithDefaults(number, null, {
    body: message.body
  }));
};

User.prototype.validEmails = function(){
  return this.allEmails().filter(e => e.valid).map(e => e.address);
};

User.prototype.validPhones = function(){
  return this.phoneNumbers.filter(p => p.valid).map(p => p.number);
};

module.exports = User;
