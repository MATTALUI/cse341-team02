(async () => {
  const deleteOrganization = async event => {
    event.preventDefault();
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
  };

  document.querySelectorAll('.admin-panel__delete')
    .forEach(ele => ele.addEventListener('click', deleteOrganization));
})();
