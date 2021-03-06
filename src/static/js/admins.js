(async () => {
  const loader = document.querySelector('#loader-template').innerHTML;
  const searchResultsContainer = document.querySelector('#search-results');
  const myEmail = document.querySelector('meta[name="myEmail"]').getAttribute('content');
  const groupId = document.querySelector('meta[name="groupId"]').getAttribute('content');
  const wait = ms => new Promise(res => setTimeout(res, ms));

  const deleteAdmin = async event => {
    const cardEle = event.target.closest('.admin-card');
    const adminName = cardEle.querySelector('.admin-card__name').innerHTML;
    const adminEmail = cardEle.querySelector('.admin-card__email').innerHTML;
    const adminIsYou = myEmail === adminEmail;
    const index = cardEle.getAttribute('data-index');
    const messagePrefix = adminIsYou ? ' This is you. You' : adminName;

    if (!confirm(`Are you sure? ${messagePrefix} will no longer be an admin. There is no going back.`)) {
      // NOTE: Alerts are bad user experience? Who's going to stop me? Fua ha ha!
      return;
    }
    const res = await fetch(`/groups/${groupId}/admins`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'CSRF-Token': getCSRFToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: adminEmail,
      }),
    });

    if (adminIsYou) {
      // Get outta here!
      location.pathname = '/';
    } else {
      // Oh, I give up...
      return window.location.reload();
      cardEle.remove();
      // TODO: shift indices
      document.querySelector('.flash-message').innerHTML = `<div class="alert alert-success">${adminName} has been dethroned...</div>`;
    }
  };

  const addAdmin = async event => {
    const newAdminEmail = document.querySelector('#admin-search').value;
    searchResultsContainer.innerHTML = loader;
    await wait(1000);
    const res = await fetch(`/groups/${groupId}/admins`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'CSRF-Token': getCSRFToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: newAdminEmail,
      }),
    });
    const data = await res.json();
    const result = data.result;
    if (result) {
      // This is easier than dynamic populating and I'm feeling lazy.
      location.reload();
    } else {
      searchResultsContainer.innerHTML = `
        <div class="no-results">An Error Has Occurred.</div>
      `;
    }
  };

  const searchUser = async event => {
    const searchValue = document.querySelector('#admin-search').value;
    searchResultsContainer.innerHTML = loader;
    await wait(1000);
    const res = await fetch(`/groups/${groupId}/admins/search?email=${searchValue}`, {
      credentials: 'include',
    });
    const userData = await res.json();
    const result = userData.result;
    if (result) {
      searchResultsContainer.innerHTML = `
        <div class="result split-heading">
          <div>
            <p>${result.firstName} ${result.lastName}</p>
            <p>${result.email.address}</p>
          </div>
          <i class="fas fa-user-plus add-user"></i>
        </div>
      `;
      searchResultsContainer.querySelector('.add-user').addEventListener('click', addAdmin);
    } else {
      searchResultsContainer.innerHTML = `
        <div class="no-results">No user Found</div>
      `;
    }
  }

  document.querySelectorAll('.admin-card__delete')
    .forEach(ele => ele.addEventListener('click', deleteAdmin));
  document.querySelector('.search > .btn-hollow').addEventListener('click', searchUser);
})();
