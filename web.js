var express = require("express");
var logfmt = require("logfmt");
var app = express();

var mongo = require('mongodb');

var mongoUri = process.env.MONGOLAB_URI ||  process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';

var collections = ["artworks", "projects"];

mongo.Db.connect(mongoUri, collections);

mongo.Db.artworks.save({
	id: 1,
	name: 'Emotion',
	price: 100,
	likes: 10
}, function( err, saved){
	if( err || !saved ){
		console.log('User not saved');
	}
	else{
		console.log('User saved');
	}
});

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  mongo.Db.find({id: 1}, function(err, artwork){
  	if( err || !artwork){
  		 response = "No Artwork Found found";	
  	}
  	else return artwork.name;
  });
  res.send(response);
});

app.get('/sayHi', function(req, res) {
  res.send('Comet says...HIIIIIIIIIII!!!');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});