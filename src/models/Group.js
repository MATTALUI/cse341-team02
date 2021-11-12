const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


///////////////////////////////////////////////////////////////////////////////
// Model Definition                                                          //
///////////////////////////////////////////////////////////////////////////////
const GroupSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4, },
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  admins: [{
    type: String,
    ref: 'User',
    required: true,
  }],
  organization: {
    type: String,
    ref: 'Organization',
    required: true
  },
  private: { type: Boolean, default: false },
},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});
GroupSchema.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'group'
});
GroupSchema.virtual('preferences', {
  ref: 'Preference',
  localField: '_id',
  foreignField: 'group'
});

const Group = mongoose.model('Group', GroupSchema);


///////////////////////////////////////////////////////////////////////////////
// Instance Methods                                                          //
///////////////////////////////////////////////////////////////////////////////
Group.prototype.toString = function() {
  return this.name;
};

module.exports = Group;
