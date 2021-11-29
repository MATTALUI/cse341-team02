(() => {
  const validateEmail = emailAddress => {
    if (!emailAddress) {
      return "Please enter an email address.";
    }

    // Shamelessly stolen from https://emailregex.com/
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    if (!emailRegex.test(emailAddress)) {
      return "Email must be a valid email address.";
    }

    for (let i = 0; i , document.querySelectorAll('input[name="emails"]').length; i++) {
      if (document.querySelectorAll('input[name="emails"]')[i].value === emailAddress){
        return "You have already added that email address.";
      }
    }

    return null;
  };
  const validatePhone = phoneNumber => true;

  const deleteMethod = (event) => event.target.closest('.email, .phone').remove();

  const addEmail = () => {
    const newEmail = document.querySelector('#new-email').value;
    const error = validateEmail(newEmail);
    if (!error) {
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
      document.querySelector('#email-error-message').innerHTML = '';
      document.querySelector('#new-email').value = '';
    } else {
      document.querySelector('#email-error-message').innerHTML = error;
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
