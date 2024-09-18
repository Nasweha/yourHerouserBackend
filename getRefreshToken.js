


const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const open = require('open');
const readline = require('readline');

const credentialsPath = path.join(__dirname, './credentials/credentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath));
const { client_secret, client_id, redirect_uris } = credentials.web;

const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
});

console.log('Authorize this app by visiting this url:', authUrl);
open(authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the code from that page here: ', async (code) => {
  rl.close();
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    fs.writeFileSync('token.json', JSON.stringify(tokens));
    console.log('Token stored to token.json');
  } catch (error) {
    console.error('Error retrieving access token', error);
  }
});
