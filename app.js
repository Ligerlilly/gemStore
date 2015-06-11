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

app.get('/', function(request, response){
  Gem.find(function(err, doc){
    response.json(doc);
  });
});

app.listen(3000, function(request, response){
  console.log('Listening on port 3000');
});

module.exports = app;
