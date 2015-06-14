var request = require('supertest');
var app = require('./app');

describe("Request to root path", function(){
  it("Returns a 200 status code", function(done){
     request(app)
       .get('/gems')
       .expect(200, done);
  });

  it ("Returns html", function (done) {
    request(app)
      .get('/gems')
      .expect('Content-Type', /json/i, done);
  });
});
