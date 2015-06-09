var express = require('express');
var app = express();

app.get('/', function(request, response){
  response.send('OK');
});

app.listen(3000, function(request, response){
  console.log('Listening on port 3000')
});

module.expots = app;
