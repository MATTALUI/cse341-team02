const GroupController = {
  index: (req, res, next) => {
    return res.send('GET /groups [index]');
  },
  show: (req, res, next) => {
    return res.send(`GET /groups/${req.params.groupId} [show]`);
  },
  create: (req, res, next) => {
    return res.send('POST /groups [create]');
  },
  new: (req, res, next) => {
    return res.send('GET /groups/new [new]');
  },
  update: (req, res, next) => {
    return res.send(`POST /groups/${req.params.groupId} [update]`);
  },
  edit: (req, res, next) => {
    return res.send(`GET /groups/${req.params.groupId}/edit [edit]`);
  },
  destroy: (req, res, next) => {
    return res.send(`DELETE /groups/${req.params.groupId} [destroy]`);
  },
};

module.exports = GroupController;
