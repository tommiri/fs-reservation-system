const formData = require('form-data');
const Mailgun = require('mailgun.js');

// Initialize mailgun library with necessary formData library
const mailgun = new Mailgun(formData);

// Create and configure Mailgun client with API credentials
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,  // Ensure your MAILGUN_API_KEY is set in the environment variables
  url: "https://api.eu.mailgun.net"
});

module.exports = mg;