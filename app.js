var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/test');

var gemSchema = {
  name:String,
  description:String,
  quantiy:Number,
  price:Number,
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

app.put('/gems/:id', function(request, response){
  Gem.findById(request.params.id, function(err, doc){
    if (err){
      response.send(err);
    }
    doc.name = request.body.gem.name;
    doc.description = request.body.gem.description;
    doc.quantity = request.body.gem.quantity;
    doc.price = request.body.gem.price;
    doc.save(function(err){
      if (err){
        response.send(err);
      }
      response.send({gem:doc});
    });
  });
});

app.delete('/gems/:id', function(request, response){
  Gem.findByIdAndRemove(request.params.id, function(err){
    if (err){
      response.send(err);
    }
  });
});

app.post('/gems', function(request, response){
  var doc= new Gem({
    name: request.body.gem.name,
    description: request.body.gem.description,
    quantity: request.body.gem.quantity,
    price: request.body.gem.price
  });
  doc.save(function(err){
    if (err){
      response.send(err);
    }
    response.send({gem: doc });
  });
});

app.get('/gems/:id', function(request, response){
  Gem.findById(request.params.id, function(err, doc){
    response.send({gem:doc});
  });
});

app.listen(3000, function(request, response){
  console.log('Listening on port 3000');
});

module.exports = app;
