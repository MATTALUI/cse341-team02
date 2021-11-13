const nodemailer = require('nodemailer');
const sgMailer = require('@sendgrid/mail');

sgMailer.setApiKey(process.env.MAILER_API_KEY);

const transportOptions = {
  port: 465,
  host: "smtp.gmail.com",
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASSWORD,
    },
  secure: true,
};

// NOTE: 99% of the time here it's an auth error here. Since we're just using google SMTP
// there's a bunch of shifting parts for security. It's honestly not worth sorting too in-depth.
const gmailer = nodemailer.createTransport(transportOptions);

const mailWithDefaults = async (to, options={}) => {
  const mailData = {
    from: process.env.MAILER_EMAIL,
    to,
    subject: 'Hello, World!',
    text: 'Hello!',
    html: '<p>Hello!</p>',
    ...options,
  };

  // Note: sgMailer will often send mail to spam boxes because of domain
  // confirmation issues.
  return await sgMailer.send(mailData);
};

const buildNewUserEmailOptions = ({
  user,
} = {}) => ({
  subject: 'Welcome to mhummer-cse341-bookstore.herokuapp.com!',
  text: 'An account for your email has been created at https://mhummer-cse341-bookstore.herokuapp.com',
  html: '<p>An account for your email has been created at https://mhummer-cse341-bookstore.herokuapp.com. <a href="https://mhummer-cse341-bookstore.herokuapp.com/auth/login">Login to buy books today!</a></p>',
});

module.exports = {
  gmailer,
  sgMailer,
  mailWithDefaults,
  buildNewUserEmailOptions,
};
