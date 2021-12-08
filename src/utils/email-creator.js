module.exports.validationEmail = function(validationUrl) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <body style="max-width: 600px; margin: 10px auto; text-align: center; background-color: rgb(235, 255, 250); font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; font-size: 18px; padding: 0 15px">
  <div style="background-color: #007981; height: 150px;">
    <img src="https://litzen.herokuapp.com/images/litzen-logo-white.svg" style="height: 75%; margin: 1rem auto 0;" alt="Litzen Logo">
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
    <body style="max-width: 600px; margin: 10px auto; text-align: center; background-color: rgb(235, 255, 250); font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; font-size: 18px; padding: 0 15px">
    <div style="background-color: #007981; height: 150px;">
    <img src="https://litzen.herokuapp.com/images/litzen-logo-white.svg" style="height: 75%; margin: 1rem auto 0;" alt="Litzen Logo">
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