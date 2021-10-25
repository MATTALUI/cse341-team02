const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

///////////////////////////////////////////////////////////////////////////////
// Model Definition                                                          //
///////////////////////////////////////////////////////////////////////////////
const UserSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4, },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  // TODO: make the email unique without breaking other models...
  email: { type: String, default: '' },
  passwordHash: { type: String, default: '' },
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

module.exports = User;
