module.exports = {
  logAndSendError: res => err => {
    // NOTE: Now that we have a nifty 500 page we just need to log the error
    console.error(err);
    return res.render('common/500', {
      csrfToken: '',
      currentUser: null,
    });
  },
};
