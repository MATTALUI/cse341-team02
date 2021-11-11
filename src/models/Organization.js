const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const User = require('./User');
let OrganizationUser = null;
const LazyOrganizationUser = () => {
  // NOTE: This is required function in order to acoid cyclical dependency
  // issues.
  if (!OrganizationUser) {
    OrganizationUser = require('./OrganizationUser');
  }
  return OrganizationUser;
};


///////////////////////////////////////////////////////////////////////////////
// Model Definition                                                          //
///////////////////////////////////////////////////////////////////////////////
const OrganizationSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4, },
  name: { type: String, required: true },
  admin: { type: User.schema, required: true },
  description: { type: String, default: '' },
},{
  timestamps: true,
});

const Organization = mongoose.model('Organization', OrganizationSchema);


///////////////////////////////////////////////////////////////////////////////
// Instance Methods                                                          //
///////////////////////////////////////////////////////////////////////////////
Organization.prototype.toString = function() {
  return this.name;
};

Organization.prototype.allUsers = async function() {
  const users = Array.from(
    await LazyOrganizationUser().find({ 'organization._id': this.id })
  ).map(ou => ou.user);

  return [this.admin].concat(users);
};

module.exports = Organization;
