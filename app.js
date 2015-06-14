var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');

var gemSchema = {
  name:String,
  description:String,
  quantiy:Number,
  Price:Number,
  image:String
};

var Gem = mongoose.model('Gem', gemSchema, 'gems');

app.use(function(request, response, next){
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

app.get('/gems', function(request, response){
  Gem.find(function(err, docs){
    response.send({gem:docs});
  });
});

app.listen(3000, function(request, response){
  console.log('Listening on port 3000');
});

module.exports = app;
