(() => {
  const validateEmail = emailAddress => {
    let valid = true;

    valid = valid && !!emailAddress;

    return valid;
  };
  const validatePhone = phoneNumber => true;

  const deleteMethod = (event) => event.target.closest('.email, .phone').remove();

  const addEmail = () => {
    const newEmail = document.querySelector('#new-email').value;
    console.log(newEmail);
    if (validateEmail(newEmail)) {
      document.querySelector('#emails').innerHTML += `
        <div class="email contact-card">
          <div class="split-heading">
            <span>${newEmail}</span>
            <input type="hidden" name="emails" value="${newEmail}">
            <span class="delete-method">X</span>
          </div>
          <span>NOTE: This email has not been saved to your account yet.</span>
        </div>
      `;
    } else {
    }
  };

  const addPhone = () => {
    const newPhone = document.querySelector('#new-phone').value;
    if (validatePhone(newPhone)) {
      document.querySelector('#phones').innerHTML += `
        <div class="phone contact-card">
          <div class="split-heading">
            <span>${newPhone}</span>
            <input type="hidden" name="phoneNumbers" value="${newPhone}">
            <span class="delete-method">X</span>
          </div>
          <span>NOTE: This phone number has not been saved to your account yet.</span>
        </div>
      `;
    } else {
    }
  };

  const preventAndCall = handler => event => {
    event.preventDefault();
    handler(event);
  }

  document.querySelector('#add-email-btn').addEventListener('click', preventAndCall(addEmail));
  document.querySelector('#add-phone-btn').addEventListener('click', preventAndCall(addPhone));
  document.querySelectorAll('.delete-method').forEach(ele =>
    ele.addEventListener('click', preventAndCall(deleteMethod))
  );

})();
