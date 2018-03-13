// requirements
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var mongojs = require('mongojs');

// global config file
require('./config.js');

// variables
var db_verguenza = [];

// feed html frontend
app.use(express.static('public'));

// feed data to client
app.get('/data', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  res.send( JSON.stringify(db_verguenza) );
});

// listen for connections
server.listen(2018, function () {
  load_db();
  time_functions();
	console.log('Server listening on port 2018');
});


// ==== DATABASE HANDLING ====
// connect and get data from mongoDB
function load_db(){
  // database
  mydb = "mongodb://" + CONFIG.MONGO_USER + ":" + CONFIG.MONGO_PASS + "@cl0-shard-00-00-fw6xy.mongodb.net:27017,cl0-shard-00-01-fw6xy.mongodb.net:27017,cl0-shard-00-02-fw6xy.mongodb.net:27017/" + CONFIG.MONGO_DOC + "?ssl=true&replicaSet=CL0-shard-0&authSource=admin"

  var db = mongojs(mydb, ['proyecto']);

  // sort by date
  db.proyecto.find({}).sort({date: 1}, function (err, docs) {
  	if(err) {
      console.log(err);
    } else {
      console.log("db ordered by date");
    }
  });

  // get data
  db.proyecto.find({}, function (err, docs) {
    if(err) {
      console.log("ERROR GETTING DATA FROM MONGODB!\n"+err);
    } else if (!docs) {
      console.log("NO DATA IN MONGODB");
    } else {
      get_mongo_data(docs);
      // console.log("DATA:")
      // list_all(db_verguenza);
    }
    db.close();
  });
}
// write data into local variable
function get_mongo_data(docs){
  db_verguenza = docs;
}
// console log data
function list_all(db_verguenza){
  for (var i = 0; i < db_verguenza.length; i++) {
    console.log(db_verguenza[i].title + " - " + db_verguenza[i].date);
  }
}



// set refresh functions
function time_functions(){
  // get data from mongoDB every 2 minutes
  setInterval(load_db, 1000*60*2);
}
