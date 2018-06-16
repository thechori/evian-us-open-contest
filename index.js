const emails = require('./config/emails');
const functions = require('./functions');

console.log('Initializing script...');

if (!emails) {
  return console.log("Please ensure that you've renamed the `config/emails.example.js` file to `emails.js`.")
}

if (!emails.length > 0) {
  return console.log("Please ensure that you've added at least one email address to the array exported in the `config/emails.js` file.");
}

let promises = [];

emails.forEach(email => {
  promises.push(functions.submit(email));
});

Promise
  .all(promises)
  .then(results => {
    console.log(`Successfully sent ${results.length} emails.`);
  })
  .catch(err => {
    console.log(err);
  });
