const PreferencesController = {
  // index: (req, res, next) => {
  //   return res.send(`GET /groups/${req.params.groupId}/preferences [index]`);
  // },
  // show: (req, res, next) => {
  //   return res.send(`GET /groups/${req.params.groupId}/preferences/${req.params.preferenceId} [show]`);
  // },
  // create: (req, res, next) => {
  //   return res.send(`POST /groups/${req.params.groupId}/preferences [create]`);
  // },
  // new: (req, res, next) => {
  //   return res.send(`GET /groups/${req.params.groupId}/new [new]`);
  // },
  update: (req, res, next) => {
    return res.send(`POST /groups/${req.params.groupId}/preferences [update]`);
  },
  edit: (req, res, next) => {
    return res.send(`GET /groups/${req.params.groupId}/preferences [edit]`);
  },
  // },
  // destroy: (req, res, next) => {
  //   return res.send(`DELETE /groups/${req.params.groupId}/preferences/${req.params.preferenceId} [destroy]`);
  // },
};

module.exports = PreferencesController;
