const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const { LazyOrganization, LazyUser } = require('./LazyModels');

///////////////////////////////////////////////////////////////////////////////
// Model Definition                                                          //
///////////////////////////////////////////////////////////////////////////////
const OrganizationUserSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4, },
  user: {
    type: String,
    ref: 'User',
    required: true,
  },
  organization: {
    type: String,
    ref: 'Organization',
    required: true,
  },
},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

const OrganizationUser = mongoose.model('OrganizationUser', OrganizationUserSchema);


///////////////////////////////////////////////////////////////////////////////
// Instance Methods                                                          //
///////////////////////////////////////////////////////////////////////////////
OrganizationUser.prototype.toString = function() {
  const User = LazyUser();
  const Organization = LazyOrganization();

  return `<${new Organization(this.organization).toString()}::${new User(this.user).toString()}>`;
};

module.exports = OrganizationUser;
