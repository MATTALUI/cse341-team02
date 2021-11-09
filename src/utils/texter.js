const twilio = require('twilio');

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const ACCOUNT_AUTH = process.env.TWILIO_AUTH_TOKEN;
const SENDER_NUMBER = process.env.TWILIO_SENDER_NUMBER;
const client = twilio(ACCOUNT_SID, ACCOUNT_AUTH);

const textWithDefaults = (to, callback=null, options={}) => {
  const textData = {
    body: 'Hello, world!',
    from: SENDER_NUMBER,
    to,
    ...options,
  };
  const handler = callback || console.log;

  return client
    .messages
    .create(textData)
    .then(handler)
    .catch(console.error);
};

module.exports = {
  client,
  textWithDefaults
};
