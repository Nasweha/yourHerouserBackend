







const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const credentialsPath = path.join(__dirname, '../credentials/credentials.json');
const tokenPath = path.join(__dirname, '../token.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath));
const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

const token = JSON.parse(fs.readFileSync(tokenPath));
oAuth2Client.setCredentials(token);

async function sendGrievanceEmail(grievance) {
  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

  const superheroEmail = 'nasweha@gmail.com'; // Update this if needed

  const emailLines = [];
  emailLines.push('From: "YourHero" <nasweha@gmail.com>');
  emailLines.push(`To: ${superheroEmail}`);
  emailLines.push('Subject: New Grievance Logged');
  emailLines.push('');
  emailLines.push(`A new grievance has been logged with the following details:`);
  emailLines.push(`Full Name: ${grievance.fullname}`);
  emailLines.push(`Email: ${grievance.emailId}`);
  emailLines.push(`Phone: ${grievance.phone}`);
  emailLines.push(`Date: ${grievance.date}`);
  emailLines.push(`Address: ${grievance.address}`);
  emailLines.push(`Description: ${grievance.description}`);
  emailLines.push('');
  emailLines.push('Please review and take necessary action.');

  const email = emailLines.join('\n');
  const encodedMessage = Buffer.from(email)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  try {
    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encodedMessage },
    });
    console.log('Email sent:', res.data);
  } catch (error) {
    console.error('Error sending email:', error.response ? error.response.data : error.message);
  }
}

module.exports = sendGrievanceEmail;
