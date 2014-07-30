var express = require("express");
var logfmt = require("logfmt");
var app = express();

var mongo = require('mongodb');

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/mydb';

mongo.Db.connect(mongoUri, function (err, db) {
  db.collection('mydocs', function(er, collection) {
    collection.insert({'mykey': 'myvalue'}, {safe: true}, function(er,rs) {
    });
  });
});

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.send('Comet says...Hello World!');
});
app.get('/sayHi', function(req, res) {
  res.send('Comet says...HIIIIIIIIIII!!!');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});