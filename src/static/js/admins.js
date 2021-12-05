(async () => {
  const deleteAdmin = async event => {
    const cardEle = event.target.closest('.admin-card');
    const adminName = cardEle.querySelector('.admin-card__name').innerHTML;
    if (!confirm(`Are you sure? ${adminName} will no longer be an admin. There is no going back.`)) {
      // NOTE: Alerts are bad user experience? Who's going to stop me? Fua ha ha!
      return;
    }

    const index = cardEle.getAttribute('data-index');
    const adminEmail = cardEle.querySelector('.admin-card__email').innerHTML;
    const myEmail = document.querySelector('meta[name="myEmail"]').getAttribute('content');
    // TODO: DELETE HERE

    if (myEmail === adminEmail) {
      // Get outta here!
      location.pathname = '/';
    } else {
      cardEle.remove();
      // TODO: shift indices
      document.querySelector('.flash-message').innerHTML = `<div class="alert alert-success">${adminName} has been dethroned...</div>`;
    }
  };

  document.querySelectorAll('.admin-card__delete')
    .forEach(ele => ele.addEventListener('click', deleteAdmin));
})();
