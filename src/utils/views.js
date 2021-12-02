const registerLocals = app => {
  app.locals.canUserMessageGroup = (selectedGroup, user) => {
    if (!selectedGroup) {
      return false;
    }

    // NOTE: admins here are not populated, so it's just an array of PKs
    return selectedGroup.admins.includes(user.id);
  };

  app.locals.filterNumber = phoneNumber => {
    // NOTE: This will need to be updated if we start supporting international
    // numbers.

    return "+1******" + phoneNumber.substring(phoneNumber.length - 4);
  }
};

module.exports = registerLocals;
