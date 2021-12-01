const registerLocals = app => {
  app.locals.canUserMessageGroup = (selectedGroup, user) => {
    if (!selectedGroup) {
      return false;
    }

    // NOTE: admins here are not populated, so it's just an array of PKs
    return selectedGroup.admins.includes(user.id);
  };
};

module.exports = registerLocals;
