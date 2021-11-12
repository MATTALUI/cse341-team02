const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const { LazyUser, LazyGroup } = require('./LazyModels');

///////////////////////////////////////////////////////////////////////////////
// Model Definition                                                          //
///////////////////////////////////////////////////////////////////////////////
const MessageSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4, },
  body: { type: String, required: true },
  poster: {
    type: String,
    ref: 'User',
    required: true
  },
  group: {
    type: String,
    ref: 'Group',
    required: true
  },
},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

const Message = mongoose.model('Message', MessageSchema);


///////////////////////////////////////////////////////////////////////////////
// Instance Methods                                                          //
///////////////////////////////////////////////////////////////////////////////
Message.prototype.toString = function() {
  const User = LazyUser();
  const Group = LazyGroup();

  return `"${this.body}" (${new User(this.poster).toString()})`;
};

module.exports = Message;
