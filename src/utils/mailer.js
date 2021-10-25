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

const mailWithDefaults = (to, callback, options={}) => {
  const mailData = {
    from: process.env.MAILER_EMAIL,
    to,
    subject: 'Hello, World!',
    text: 'Hello!',
    html: '<p>Hello!</p>',
    ...options,
  };

  const handler = callback || function (err, info) {
   if(err){
     console.error(err);
   } else{
     console.log(info);
   }
};

  // TODO: Determine mailer to use;
  return gmailer.sendMail(mailData, handler);
  return sgMailer.send(mailData)
    .then(res => handler(null, res))
    .catch(err => handler(err, null));
};

module.exports = {
  gmailer,
  sgMailer,
  mailWithDefaults,
};
