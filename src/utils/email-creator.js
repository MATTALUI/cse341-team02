module.exports.validationEmail = function(validationUrl) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <body style="max-width: 600px; margin: 10px auto; text-align: center; background-color: rgb(235, 255, 250); font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; font-size: 18px;">
  <div style="background-color: #007981; height: 150px;">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 449.04 209" style="height: 75%; margin-top: 1rem;">
      <title>litzen-logo-white</title>
      <g id="Layer_2" data-name="Layer 2">
        <g id="logo-white">
          <g>
            <g>
              <path d="M88.57,192.5H11.52L75.35,59.18a32.79,32.79,0,0,1-16.59,4.4,41,41,0,0,1-5.9-.43l10-20.69h4.85q12.6,0,22.92-15h28.69L51.08,169.62h49Z" transform="translate(-11.45 -27.5)" style="fill: #fff"/>
              <path d="M175,88.22l-50.06,104.5H98.1l50.06-104.5Zm-2-16.94q-6.64.22-10.38-3.41t-2.37-9.13q1.37-5.5,7-9.57a22,22,0,0,1,12.3-4.29q6.63-.22,10.38,3.41t2.37,9.13q-1.37,5.5-7,9.57A21.91,21.91,0,0,1,173,71.28Z" transform="translate(-11.45 -27.5)" style="fill: #fff"/>
              <path d="M175.42,192.5H148.78l39-81.4H175.46l10.87-22.66h12.29l21.61-45.1h26.57l-21.45,45.1h16.93L231.2,111.1H214.49Z" transform="translate(-11.45 -27.5)" style="fill: #fff"/>
              <path d="M243.15,169.62h30.2L262.8,192.5h-67l69.46-81.62H233L243.7,88.22h68.73Z" transform="translate(-11.45 -27.5)" style="fill: #fff"/>
              <path d="M310.19,157.74q-1,9.46,2.71,11.66a13.34,13.34,0,0,0,2.46,1.76q13.88.22,27.16-11.88l-14.17,29.66q-9.62,6-18.92,6a26.84,26.84,0,0,1-15.11-4.62Q279,180.4,286,152.46A92.72,92.72,0,0,1,299.5,123a91.78,91.78,0,0,1,25.12-25.41Q339,88,351.2,88A22.22,22.22,0,0,1,363,91.08q13.81,5.94,8.71,26.4a42.73,42.73,0,0,1-2.28,6.82q-6.17,13.86-20.8,24.42t-28.77,10.56A29.44,29.44,0,0,1,310.19,157.74Zm6.32-19.14a28.77,28.77,0,0,0,7.14.88,29.16,29.16,0,0,0,17.19-5.28q8-6.38,9.57-12.76a10.12,10.12,0,0,0-.62-6.82q-1.5-3.3-4.6-3.3-6.78,0-16.27,10.12A75.31,75.31,0,0,0,316.51,138.6Z" transform="translate(-11.45 -27.5)" style="fill: #fff"/>
              <path d="M427.7,209q4.4.22,9.37-4.18l.87,19.8q-11.84,11-29.1,11.88-11.23,0-16.14-9a21.2,21.2,0,0,1-2.44-15.83q-.27,1.1,6.58-19.13l33.45-69.74a9.53,9.53,0,0,0,.87-2.2q.93-3.75-1.66-5.73a3.33,3.33,0,0,0-2.76-1.32q-3.48,0-8.47,3.74-3.56,2.64-7.17,5.5a29.36,29.36,0,0,0-6,6.38L374.42,192.5H347.79l49.9-103.84h26.62l-3.21,7q12.6-7,22.86-7a18.92,18.92,0,0,1,6.17.87q13.85,8.09,9.17,26.89a37,37,0,0,1-2.16,6.34L423.49,192.5Q419.4,208.12,427.7,209Z" transform="translate(-11.45 -27.5)" style="fill: #fff"/>
            </g>
            <polygon points="344.73 200.7 1.04 200.15 1.04 180.7 353.04 180.2 344.73 200.7" style="fill: #fff;stroke: #fff;stroke-miterlimit: 10;stroke-width: 2.0818102390951854px"/>
          </g>
        </g>
      </g>
    </svg>
  </div>
  <h1>Welcome to Litzen!</h1>
  <p style="text-align: left;">A Litzen account has been associated with this email address.
    To confirm your account and start receiving announcements click the button below:
  </p>
  <a href="${validationUrl}" target="_blank"
  style="background-color: #fefefe;
        color: #007981;
        border: 2px solid #007981;
        border-radius: 0.35rem;
        padding: 0.5rem;
        cursor: pointer;
        text-decoration: none;
        display: inline-block;"
  >Validate Account</a>

  <p style="text-align: left;">If the above link does not work you can visit ${validationUrl}</p>

  <footer style="background-color: #007981; height: 50px; width: 600px; position:absolute; bottom: 10px;">
    <p style="text-align: center; ">
      <a href="https://www.litzen.com/" style="text-decoration: none; color: #fefefe;">Litzen &copy; 2021 Team 2 CSE341</a>
    </p>
  </footer>
</body>
</html>
`;
}

module.exports.newMessageNotification = function(poster, group, message) {
  return `
  <!DOCTYPE html>
    <html lang="en">
    <body style="max-width: 600px; margin: 10px auto; text-align: center; background-color: rgb(235, 255, 250); font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; font-size: 18px;">
    <div style="background-color: #007981; height: 150px;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 449.04 209" style="height: 75%; margin-top: 1rem;">
        <title>litzen-logo-white</title>
        <g id="Layer_2" data-name="Layer 2">
          <g id="logo-white">
            <g>
              <g>
                <path d="M88.57,192.5H11.52L75.35,59.18a32.79,32.79,0,0,1-16.59,4.4,41,41,0,0,1-5.9-.43l10-20.69h4.85q12.6,0,22.92-15h28.69L51.08,169.62h49Z" transform="translate(-11.45 -27.5)" style="fill: #fff"/>
                <path d="M175,88.22l-50.06,104.5H98.1l50.06-104.5Zm-2-16.94q-6.64.22-10.38-3.41t-2.37-9.13q1.37-5.5,7-9.57a22,22,0,0,1,12.3-4.29q6.63-.22,10.38,3.41t2.37,9.13q-1.37,5.5-7,9.57A21.91,21.91,0,0,1,173,71.28Z" transform="translate(-11.45 -27.5)" style="fill: #fff"/>
                <path d="M175.42,192.5H148.78l39-81.4H175.46l10.87-22.66h12.29l21.61-45.1h26.57l-21.45,45.1h16.93L231.2,111.1H214.49Z" transform="translate(-11.45 -27.5)" style="fill: #fff"/>
                <path d="M243.15,169.62h30.2L262.8,192.5h-67l69.46-81.62H233L243.7,88.22h68.73Z" transform="translate(-11.45 -27.5)" style="fill: #fff"/>
                <path d="M310.19,157.74q-1,9.46,2.71,11.66a13.34,13.34,0,0,0,2.46,1.76q13.88.22,27.16-11.88l-14.17,29.66q-9.62,6-18.92,6a26.84,26.84,0,0,1-15.11-4.62Q279,180.4,286,152.46A92.72,92.72,0,0,1,299.5,123a91.78,91.78,0,0,1,25.12-25.41Q339,88,351.2,88A22.22,22.22,0,0,1,363,91.08q13.81,5.94,8.71,26.4a42.73,42.73,0,0,1-2.28,6.82q-6.17,13.86-20.8,24.42t-28.77,10.56A29.44,29.44,0,0,1,310.19,157.74Zm6.32-19.14a28.77,28.77,0,0,0,7.14.88,29.16,29.16,0,0,0,17.19-5.28q8-6.38,9.57-12.76a10.12,10.12,0,0,0-.62-6.82q-1.5-3.3-4.6-3.3-6.78,0-16.27,10.12A75.31,75.31,0,0,0,316.51,138.6Z" transform="translate(-11.45 -27.5)" style="fill: #fff"/>
                <path d="M427.7,209q4.4.22,9.37-4.18l.87,19.8q-11.84,11-29.1,11.88-11.23,0-16.14-9a21.2,21.2,0,0,1-2.44-15.83q-.27,1.1,6.58-19.13l33.45-69.74a9.53,9.53,0,0,0,.87-2.2q.93-3.75-1.66-5.73a3.33,3.33,0,0,0-2.76-1.32q-3.48,0-8.47,3.74-3.56,2.64-7.17,5.5a29.36,29.36,0,0,0-6,6.38L374.42,192.5H347.79l49.9-103.84h26.62l-3.21,7q12.6-7,22.86-7a18.92,18.92,0,0,1,6.17.87q13.85,8.09,9.17,26.89a37,37,0,0,1-2.16,6.34L423.49,192.5Q419.4,208.12,427.7,209Z" transform="translate(-11.45 -27.5)" style="fill: #fff"/>
              </g>
              <polygon points="344.73 200.7 1.04 200.15 1.04 180.7 353.04 180.2 344.73 200.7" style="fill: #fff;stroke: #fff;stroke-miterlimit: 10;stroke-width: 2.0818102390951854px"/>
            </g>
          </g>
        </g>
      </svg>
    </div>
    <h1>New Message Notification</h1>
    <p style="text-align: left;">
      ${poster} sent a new message to ${group}:
    </p>
    <p style="text-align: left;">
      ${message}
    </p>
 
    <footer style="background-color: #007981; height: 50px; width: 600px; position:absolute; bottom: 10px;">
      <p style="text-align: center; ">
        <a href="https://www.litzen.com/" style="text-decoration: none; color: #fefefe;">Litzen &copy; 2021 Team 2 CSE341</a>
      </p>
    </footer>
  </body>
    </html> 
  `
} 