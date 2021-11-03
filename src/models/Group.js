const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const User = require('./User');
const Organization = require('./Organization');

///////////////////////////////////////////////////////////////////////////////
// Model Definition                                                          //
///////////////////////////////////////////////////////////////////////////////
const GroupSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4, },
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  admins: [User.schema],
  organization: { type: Organization.schema, required: true },
  private: { type: Boolean, default: false },
},{
  timestamps: true,
});

const Group = mongoose.model('Group', GroupSchema);


///////////////////////////////////////////////////////////////////////////////
// Instance Methods                                                          //
///////////////////////////////////////////////////////////////////////////////
Group.prototype.toString = function() {
  return this.name;
};

module.exports = Group;
