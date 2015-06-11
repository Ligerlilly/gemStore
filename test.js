var request = require('supertest');
var app = require('./app');

describe("Request to root path", function(){
  it("Returns a 200 status code", function(done){
     request(app)
       .get('/')
       .expect(200, done);
  });

  it ("Returns JSON", function (done) {
    request(app)
      .get('/')
      .expect('Content-Type', /json/i, done);
  });
});
