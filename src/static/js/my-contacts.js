(() => {
  const validateEmail = emailAddress => true;
  const validatePhone = phoneNumber => true;
  const addEmail = () => {
    const newEmail = document.querySelector('#new-email').value;
    console.log(newEmail);
    if (validateEmail(newEmail)) {
      document.querySelector('#emails').innerHTML += `
        <div class="email contact-card">
          <div class="split-heading">
            <span>${newEmail}</span>
            <input type="hidden" name="emails" value="${newEmail}">
            <span>X</span>
          </div>
          <span>NOTE: This email has not been saved to your account yet.</span>
        </div>
      `;
    } else {
    }
  };

  const addPhone = () => {
    const newPhone = document.querySelector('#new-phone').value;
    console.log(newPhone);
    if (validatePhone(newPhone)) {

    } else {
    }
  };

  const preventAndCall = handler => event => {
    event.preventDefault();
    handler();
  }

  document.querySelector('#add-email-btn').addEventListener('click', preventAndCall(addEmail));
  document.querySelector('#add-phone-btn').addEventListener('click', preventAndCall(addPhone));
})();
