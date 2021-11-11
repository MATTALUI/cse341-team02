const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

///////////////////////////////////////////////////////////////////////////////
// Model Definition                                                          //
///////////////////////////////////////////////////////////////////////////////
const PhoneSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4, },
  number: { type: String, required: true },
  valid: { type: Boolean, default: false },
},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// const Phone = mongoose.model('Phone', PhoneSchema);


///////////////////////////////////////////////////////////////////////////////
// Instance Methods                                                          //
///////////////////////////////////////////////////////////////////////////////
// Phone.prototype.toString = function() {
//   return this.name;
// };

module.exports = PhoneSchema;
