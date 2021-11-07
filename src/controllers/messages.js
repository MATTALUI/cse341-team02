const MessagesController = {
  // index: (req, res, next) => {
  //   return res.send(`GET /groups/${req.params.groupId}/messages [index]`);
  // },
  show: (req, res, next) => {
    return res.send(`GET /groups/${req.params.groupId}/messages/${req.params.messageId} [show]`);
  },
  create: (req, res, next) => {
    return res.send(`POST /groups/${req.params.groupId}/messages [create]`);
  },
  new: (req, res, next) => {
    return res.send(`GET /groups/${req.params.groupId}/new [new]`);
  },
  // update: (req, res, next) => {
  //   return res.send(`POST /groups/${req.params.groupId}/messages/${req.params.messageId} [update]`);
  // },
  // edit: (req, res, next) => {
  //   return res.send(`GET /groups/${req.params.groupId}/messages/${req.params.messageId}/edit [edit]`);
  // },
  // destroy: (req, res, next) => {
  //   return res.send(`DELETE /groups/${req.params.groupId}/messages/${req.params.messageId} [destroy]`);
  // },
};

module.exports = MessagesController;
