const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const User = require('./User');
const Group = require('./Group');

///////////////////////////////////////////////////////////////////////////////
// Model Definition                                                          //
///////////////////////////////////////////////////////////////////////////////
const MessageSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4, },
  poster: { type: User.schema, required: true },
  body: { type: String, default: '' },
  group: { type: Group.schema, required: true },
},{
  timestamps: true,
});

const Message = mongoose.model('Message', MessageSchema);


///////////////////////////////////////////////////////////////////////////////
// Instance Methods                                                          //
///////////////////////////////////////////////////////////////////////////////
Message.prototype.toString = function() {
  return `"${this.body}" (${new User(this.poster).toString()})`;
};

module.exports = Message;
