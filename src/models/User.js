const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const { mailWithDefaults } = require('../utils/mailer');
const { textWithDefaults } = require('../utils/texter');

///////////////////////////////////////////////////////////////////////////////
// Model Definition                                                          //
///////////////////////////////////////////////////////////////////////////////
const UserSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4, },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, default: '' },
  phoneNumber: { type: String },
},{
  timestamps: true,
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

User.prototype.sendMessage = function(message) {
  // NOTE: This may become needed for tetsing only, as it will not apply well
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
  // TODO: we'll want to implement an email confirmation system with multiple
  // emails eventually. For now this method can abstract that.
  return [this.email, 'mattalui@gmail.com'];
};

User.prototype.validPhones = function(){
  // TODO: we'll want to implement an phone confirmation system with multiple
  // phones eventually. For now this method can abstract that.
  return [this.phoneNumber];
};

module.exports = User;
