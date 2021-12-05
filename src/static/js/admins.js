(async () => {
  const loader = document.querySelector('#loader-template').innerHTML;
  const searchResultsContainer = document.querySelector('#search-results');
  const wait = ms => new Promise(res => setTimeout(res, ms));

  const deleteAdmin = async event => {
    const cardEle = event.target.closest('.admin-card');
    const adminName = cardEle.querySelector('.admin-card__name').innerHTML;
    const adminEmail = cardEle.querySelector('.admin-card__email').innerHTML;
    const myEmail = document.querySelector('meta[name="myEmail"]').getAttribute('content');
    const adminIsYou = myEmail === adminEmail;
    const index = cardEle.getAttribute('data-index');
    const messagePrefix = adminIsYou ? ' This is you. You' : adminName;

    if (!confirm(`Are you sure? ${messagePrefix} will no longer be an admin. There is no going back.`)) {
      // NOTE: Alerts are bad user experience? Who's going to stop me? Fua ha ha!
      return;
    }
    // TODO: DELETE HERE

    if (adminIsYou) {
      // Get outta here!
      location.pathname = '/';
    } else {
      cardEle.remove();
      // TODO: shift indices
      document.querySelector('.flash-message').innerHTML = `<div class="alert alert-success">${adminName} has been dethroned...</div>`;
    }
  };

  const searchUser = async event => {
    const searchValue = document.querySelector('#admin-search').value;
    searchResultsContainer.innerHTML = loader;
    await wait(1000);
    searchResultsContainer.innerHTML = '';
  }

  document.querySelectorAll('.admin-card__delete')
    .forEach(ele => ele.addEventListener('click', deleteAdmin));
  document.querySelector('.search > .btn-hollow').addEventListener('click', searchUser);
})();
