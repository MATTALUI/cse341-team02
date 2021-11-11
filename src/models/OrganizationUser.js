const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const User = require('./User');
const Organization = require('./Organization');

///////////////////////////////////////////////////////////////////////////////
// Model Definition                                                          //
///////////////////////////////////////////////////////////////////////////////
const OrganizationUserSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4, },
  user: { type: User.schema, required: true },
  organization: { type: Organization.schema, required: true },
},{
  timestamps: true,
});

const OrganizationUser = mongoose.model('OrganizationUser', OrganizationUserSchema);


///////////////////////////////////////////////////////////////////////////////
// Instance Methods                                                          //
///////////////////////////////////////////////////////////////////////////////
OrganizationUser.prototype.toString = function() {
  return `<${new Organization(this.organization).toString()}::${new User(this.user).toString()}>`;
};

module.exports = OrganizationUser;
