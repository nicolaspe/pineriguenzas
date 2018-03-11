var express = require('express');
var app = express();
var server = require('http').createServer(app);
const sqlite3 = require('sqlite3').verbose();

app.use(express.static('public'));

//anonymous function
server.listen(2018, function () {
	  console.log('Server listening on port 2018')
});


let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

// close database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
