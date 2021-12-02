const Group = require('../models/Group');
const Message = require('../models/Message');

const MessagesController = {
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
        // NOTE: Currently, this method is sort of fire and forget. It's not ideal
        // and it won't scale very well, but it's what we're going to do within
        // the scope of this project...
        message.sendNotifications();

        req.flash('success', `Your message has been posted.`);

        return res.redirect(`/groups/${group.id}`);
    },
    new: async (req, res, next) => {
        const message = new Message();
        const group = await Group.findById(req.params.groupId);
        return res.render('messages/groupMessageCreation', {
            message,
            group,
            csrfToken: req.csrfToken(),
        });
    },
};

module.exports = MessagesController;