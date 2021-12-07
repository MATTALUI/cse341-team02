(async () => {
  const deleteGroup = async event => {
    event.preventDefault();
    // NOTE: I know alerts are annoying, but we're out of time!
    if (!confirm('Are you sure? This can not be undone.')) {
      return;
    }
    const groupId = event.target.getAttribute('data-id');
    const res = await fetch(`/groups/${groupId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'CSRF-Token': getCSRFToken(),
      },
    });
    const data = await res.json();
    event.target.closest('.group-card').remove();
    document.querySelector('.flash-message').innerHTML = `<div class="alert alert-success">${data.name} group has been deleted.</div>`;
  };

  document.querySelectorAll('.admin-panel__delete')
    .forEach(ele => ele.addEventListener('click', deleteGroup));
})();
