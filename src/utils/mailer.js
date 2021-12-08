const nodemailer = require('nodemailer');
const sgMailer = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;
const JWT_ALGO = 'HS256';
const JWT_SECRET = process.env.JWT_SECRET;

const mailCreator =require('./email-creator');

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
  email,
} = {}) => {
  const hashData = {
    userId: user.id,
    address: email.address,
    confirmationKey: email.confirmationKey,
  };
  // NOTE: Since this uses the sync vertion of jwt.sign, make sure that we use
  // it in an async contexts so it doesn't matter.
  const token = jwt.sign(hashData, JWT_SECRET, { algorithm: JWT_ALGO });
  const emailValidationPath = `${process.env.HOST}/users/${user.id}/confirm-email`;
  const validationUrl = `${emailValidationPath}?token=${token}`;
  console.log(validationUrl);
  return {
    subject: 'Welcome to Litzen!',
    text: `A Litzen account has been associated with this email address. To confirm your account and start receiving announcements visit the following address: ${validationUrl}/`,
    html: mailCreator.validationEmailCreator(validationUrl),
    
    // `<p>A Litzen account has been associated with this email address. To confirm your account and start receiving announcements click <a href="${validationUrl}">here</a>.</p>
    //   <p>If the above link does not work you can visit ${validationUrl}</p>
    //   `,
  };
};

const buildGroupMessageEmailOptions = ({
  message
}) => {
  return {
    subject: `Litzen: New message from ${message.group.name}`,
    text: `${message.poster.toString()} sent a new message to ${message.group.name}: ${message.body}`,
    html: mailCreator.newMessageNotification(message.poster.toString(), message.group.name, message.body),
    // `
    //   <div>
    //     <div>
    //       ${message.poster.toString()} sent a new message to ${message.group.name}
    //     </div>
    //     <p>${message.body}</p>
    //   </div>
    // `,
  };
};

module.exports = {
  gmailer,
  sgMailer,
  mailWithDefaults,
  buildNewUserEmailOptions,
  buildGroupMessageEmailOptions,
};