(async () => {
  const deleteOrganization = async event => {
    event.preventDefault();
    // NOTE: I know alerts are annoying, but we're out of time!
    if (!confirm('Are you sure? This can not be undone.')) {
      return;
    }
    const orgId = event.target.getAttribute('data-id');
    const res = await fetch(`/organizations/${orgId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'CSRF-Token': getCSRFToken(),
      },
    });
    const data = await res.json();
    event.target.closest('.organization-card').remove();
    document.querySelector('.flash-message').innerHTML = '<div class="alert alert-success">Organization has been deleted.</div>'
  };

  document.querySelectorAll('.admin-panel__delete')
    .forEach(ele => ele.addEventListener('click', deleteOrganization));
})();
