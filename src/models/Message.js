const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const { LazyUser, LazyGroup } = require('./LazyModels');
const { textWithDefaults } = require('../utils/texter');
const { mailWithDefaults, buildGroupMessageEmailOptions } = require('../utils/mailer');

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
  const userString = (typeof this.poster === 'string') ? this.poster : new User(this.poster).toString();

  return `"${this.body}" (${userString})`;
};

Message.prototype.sendNotifications = async function() {
  await this.populate('poster');
  await this.populate({
    path: 'group',
    populate: {
      path: 'preferences',
      populate: 'user',
    },
  });

  // NOTE: We can batch send all the emails, but we can't batch send the texts.
  let batchEmails = [];
  this.group.preferences.map((preference) => {
    preference.validPhones().forEach(phoneNumber => {
      textWithDefaults(phoneNumber, null, {
        body: `${this.poster.toString()} sent a new message to ${this.group.name}: ${this.body}`,
      });
    });
    batchEmails = batchEmails.concat(preference.validEmails());
  });
  if (batchEmails.length) {
    mailWithDefaults(batchEmails, buildGroupMessageEmailOptions({ message: this }));
  }

  return true;
};

module.exports = Message;
