const config = require('./config');
const express = require('express');
const path = require('path');
const http = require('http');
const enforce = require('express-sslify');

const mongoose = require('mongoose');
const app = express();

//require("dotenv").config({ path: __dirname + `/../.env` });
/* Author: CU
  dotenv problem:
  - unproductive to run in production, but the recommended flag of process.env.NODE_ENV is missing when running locally
*/

function box(content){
  let length = content.length + 2;
  return '╔' + '═'.repeat(length) + '╗\n║ ' + content + ' ║ ' + new Date().toLocaleTimeString() + '\n╚' + '═'.repeat(length) + '╝'
}

mongoose
  .set('useNewUrlParser', true)
  .set('useUnifiedTopology', true)
  .connect(process.env.DB_URI)
  .then(
    (db) => {console.log(box('Connected correctly to MongoDB'));},
    (err) => {console.log(err);}
  )
;

app
/* Author: CU
  enforcement of HTTPS needs to be set to run only when it detects production; creation of local SSL proxies did not seem worth the time
*/
  .use(enforce.HTTPS({trustProtoHeader: true}))
  .use(express.static(path.join(__dirname, '../dist/portfolio')))
  .use('/api/projects', require('./routes/projectrouter'))
  .use('/api/tasks', require('./routes/taskrouter'))
;

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/portfolio/index.html'), (err) => {
    if (err) {res.status(500).send(err)}
  })
});

app.listen(
  process.env.PORT || 8080 // Heroku default
);

console.log(box('Server is now active'));
