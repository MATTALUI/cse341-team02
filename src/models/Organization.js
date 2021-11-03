const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const User = require('./User');

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

module.exports = Organization;
