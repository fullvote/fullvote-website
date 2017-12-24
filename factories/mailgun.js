const mailgunDomain = require('../config.json').mailgunDomain;
const mailgunKey = require('../keys').mailgun;
const Mailgun = require('mailgun-js');

const mailgun = Mailgun({
  apiKey: mailgunKey,
  domain: mailgunDomain
});

module.exports = mailgun;
