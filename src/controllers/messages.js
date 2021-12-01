const Group = require('../models/Group');
const Message = require('../models/Message');
const User = require('../models/User');

const MessagesController = {
  // index: async (req, res, next) => {
  //   return res.send(`GET /groups/${req.params.groupId}/messages [index]`);
  // },
  show: async (req, res, next) => {
    const message = await Message.findById(req.params.messageId);
    const posterId = message.poster;
    const poster = await User.findById(posterId);
    const selectedGroup = await Group.findById(req.params.groupId);

    
    console.log("This is the poster:");
    console.log(poster);
    console.log("This is the message:");
    console.log(message);

    return res.render('messages/show', {
      message,
      poster,
      selectedGroup
    });
  },
  create: async (req, res, next) => {
    const group = await Group.findById(req.params.groupId);
    const message = await Message.create({
      ...req.body,
      group,
      poster: req.user,
    });
    // NOTE: Currently, this method is sort of fire and forget. It's not ideal
    // and it won't scale very well, but it's what we're going to do within
    // the scope of this project...
    message.sendNotifications();

    req.flash('success', `Your message has been posted.`);

    return res.redirect('/messages');
  },
  new: async (req, res, next) => {
    const message = new Message();

    return res.render('messages/groupMessageCreation', {
      message,
      csrfToken: req.csrfToken(),
    });
  },
  // update: async (req, res, next) => {
  //   return res.send(`POST /groups/${req.params.groupId}/messages/${req.params.messageId} [update]`);
  // },
  // edit: async (req, res, next) => {
  //   return res.send(`GET /groups/${req.params.groupId}/messages/${req.params.messageId}/edit [edit]`);
  // },
  // destroy: async (req, res, next) => {
  //   return res.send(`DELETE /groups/${req.params.groupId}/messages/${req.params.messageId} [destroy]`);
  // },
};

module.exports = MessagesController;
