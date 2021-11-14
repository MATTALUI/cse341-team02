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

const accountValidationPath = `${process.env.HOST}/auth/login`;
const buildNewUserEmailOptions = ({
  user,
  email,
} = {}) => ({
  subject: 'Welcome to Litzen!',
  text: `A Litzen account for your email has been created. To confirm your account and start receiving announcements visit the following address: ${accountValidationPath}/`,
  html: `
    <p>A Litzen account for your email has been created. To confirm your account and start receiving announcements click <a href="${accountValidationPath}/">here</a>.</p>
    <p>If the above link does not work you can visit ${accountValidationPath}/</p>
    `,
});

module.exports = {
  gmailer,
  sgMailer,
  mailWithDefaults,
  buildNewUserEmailOptions,
};
