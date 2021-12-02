(async () => {
  const loader = document.querySelector('#loader-template').innerHTML;
  const successTemplate =document.querySelector('#success-template').innerHTML;
  const failureTemplate =document.querySelector('#failure-template').innerHTML;
  const cardContent = document.querySelector('#card-content');

  const wait = ms => new Promise(res => setTimeout(res, ms));

  const confirmVerificationCode = async event => {
    event.preventDefault();
    const inputtedCode = document.querySelector('#code-input').value;
    cardContent.innerHTML = loader;
    // We wait at least a second, otherwise this looks jarring on fast machines.
    await wait(1000);
    let success = false;

    try {
      const res = await fetch(location.pathname, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'CSRF-Token': getCSRFToken(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: inputtedCode,
        }),
      });
      const data = await res.json();
      success = data.success;
    } catch (e) {
      console.error(e);
    }

    if (success) {
      // TODO: This is just a hack to get the synamic path. Investigate a
      // cleaner way to do this...
      const paths = location.pathname.split('/');
      paths[3] = 'contact-methods';
      const path = paths.join('/');
      location.pathname = paths.slice(0, 4).join('/');
    } else {
      cardContent.innerHTML = successTemplate;
      document.querySelector('.send-confirmation-text').addEventListener('click', sendConfirmationText);
      document.querySelector('#verify').addEventListener('click', confirmVerificationCode);
      document.querySelector('#code-input').value = inputtedCode;

      const error = document.createElement('p');
      error.innerHTML = 'Invalid Confirmation Code';
      error.classList.add('error-message');
      cardContent.prepend(error);
    }
  };

  const sendConfirmationText = async event => {
    event.preventDefault();
    cardContent.innerHTML = loader;
    // We wait at least a second, otherwise this looks jarring on fast machines.
    await wait(1000);
    let success = false;
    try {
      // TODO: This is just a hack to get the synamic path. Investigate a
      // cleaner way to do this...
      const paths = location.pathname.split('/');
      paths[5] = 'send-code';
      const path = paths.join('/');
      const res = await fetch(path, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'CSRF-Token': getCSRFToken(),
        },
      });
      const data = await res.json();
      success = data.success;
    } catch (e) {
      console.error(e);
    }

    if (success) {
      cardContent.innerHTML = successTemplate;
      document.querySelector('.send-confirmation-text').addEventListener('click', sendConfirmationText);
      document.querySelector('#verify').addEventListener('click', confirmVerificationCode);
    } else {
      cardContent.innerHTML = failureTemplate;
      document.querySelector('.send-confirmation-text').addEventListener('click', sendConfirmationText);
    }
  };

  document.querySelector('.send-confirmation-text').addEventListener('click', sendConfirmationText);
})();
