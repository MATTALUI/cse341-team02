const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

///////////////////////////////////////////////////////////////////////////////
// Model Definition                                                          //
///////////////////////////////////////////////////////////////////////////////
const EmailSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4, },
  address: { type: String, required: true },
  valid: { type: Boolean, default: false },
},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// const Email = mongoose.model('Email', EmailSchema);


///////////////////////////////////////////////////////////////////////////////
// Instance Methods                                                          //
///////////////////////////////////////////////////////////////////////////////
// Email.prototype.toString = function() {
//   return this.name;
// };

module.exports = EmailSchema;
