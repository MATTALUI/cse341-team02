const Group = require('../models/Group');
const Message = require('../models/Message');

const MessagesController = {
  // index: async (req, res, next) => {
  //   return res.send(`GET /groups/${req.params.groupId}/messages [index]`);
  // },
  show: async (req, res, next) => {
    const message = await Message.findById(req.params.messageId);

    return render('messages/show', {
      message,
    });
  },
  create: async (req, res, next) => {
    const group = await Group.findById(req.params.groupId);
    const message = await Message.create({
      ...req.body,
      group,
      poster: req.user,
    });
    // TODO: send the message out to everyone in the group
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
