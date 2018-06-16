# Evian US Open Contest

This Node.js script automates the daily entry to the contest [here](https://evianusopen.com/pages/index.php).

## Installation

1. Clone the repo and cd into the directory

2. Run `npm install` to install all of the project dependencies

3. Add your email(s) to the `emails.js` file

3. Install a new cronjob to run the script on a daily basis by typing the following:

  `$ crontab -e`

4. Add the following line to run the script daily at 8:00am local time

  `0 8 * * * * node path/to/your/evian-us-open-contest/index.js`

  *Note*: Ensure that `node` is in your `$PATH` variable for this to work properly
