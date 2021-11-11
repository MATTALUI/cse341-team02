const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

///////////////////////////////////////////////////////////////////////////////
// Model Definition                                                          //
///////////////////////////////////////////////////////////////////////////////
const OrganizationSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4, },
  name: { type: String, required: true },
  admin: {
    type: String,
    ref: 'User',
    required: true,
  },
  description: { type: String, default: '' },
},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});
OrganizationSchema.virtual('organizationUsers', {
  ref: 'OrganizationUser',
  localField: '_id',
  foreignField: 'organization'
});

const Organization = mongoose.model('Organization', OrganizationSchema);


///////////////////////////////////////////////////////////////////////////////
// Instance Methods                                                          //
///////////////////////////////////////////////////////////////////////////////
Organization.prototype.toString = function() {
  return this.name;
};

Organization.prototype.allUsers = async function() {
  await Promise.all([this.populate('admin'), this.populate({
    path: 'organizationUsers',
    populate: 'user',
  })]);
  return [this.admin].concat(this.organizationUsers.map(ou => ou.user));
};

module.exports = Organization;
