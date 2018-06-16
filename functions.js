let fetch = require('node-fetch');
let nodemailer = require('nodemailer');
let FormData = require('form-data');
const config = require('./config/server');

// Takes an email address and submits it to the contest page
exports.submit = function (email) {
  return new Promise((resolve, reject) => {
    let form = new FormData();
    form.append('email', email);

    fetch('https://evianusopen.com/ajax/landing.php', {
      method: 'POST',
      body: form
    })
    .then(res => res.json())
    .then(json => {
      exports.sendEmail(email, json, true)
        .then(() => {
          resolve(true);
        })
        .catch(err => {
          reject(err);
        });
    })
    .catch(err => {
      exports.sendEmail(email, err, false)
        .then(() => {
          resolve(false);
        })
        .catch(err => {
          reject(err);
        })
    })
  });
}

// Emails the result of the submission
exports.sendEmail = function (email, content, success) {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass
      }
    });

    // Builds HTML for email
    const emailBody = `
      <div>
        <h1>Evian</h1>
        ${success ? "<p>Success!</p>" : "<p>Not successful...</p>"}
        <p>${JSON.stringify(content)}</p>
      </div>
    `

    // setup email data with unicode symbols
    let subject = `Evian Contest Submission - ${success ? "SUCCESS" : "ERROR"}`;
    let mailOptions = {
      from: '"Teodoro System Contests" <contents@teodorosystems.com>', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: emailBody,
      html: emailBody
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      }
      console.log('Message sent: %s', info.messageId);
      resolve(true);
    });
  });
}
