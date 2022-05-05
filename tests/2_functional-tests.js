const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('/api/convert?input=1gal', function (done) {
    chai
      .request(server)
      .get('/api/convert?input=1gal')
      .end(function (err, res) {
        assert.equal(res.status, 200, 'Response status should be 200.');
        assert.equal(res.text, '{"initNum":1,"initUnit":"gal","returnNum":3.78541,"returnUnit":"L","string":"1 gallons converts to 3.78541 liters"}', 'Response should match the pattern.');
        done();
      });
  });

  test('/api/convert?input=32g', function (done) {
    chai
      .request(server)
      .get('/api/convert?input=32g')
      .end(function (err, res) {
        assert.equal(res.status, 200, 'Response status should be 200.');
        assert.equal(res.text, '"invalid unit"');
        done();
      });
  });

  test('/api/convert?input=3/7.2/4kg', function (done) {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kg')
      .end(function (err, res) {
        assert.equal(res.status, 200, 'Response status should be 200.');
        assert.equal(res.text, '"invalid number"');
        done();
      });
      
  });

  test('/api/convert?input=3/7.2/4kilomegagram', function (done) {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end(function(err, res) {
        assert.equal(res.status, 200, 'Response status should be 200');
        assert.equal(res.text, '"invalid number and unit"');
        done();
      })
  });

  test('/api/convert?input=kg', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=kg')
      .end(function(err, res) {
        assert.equal(res.status, 200, 'Response status should be 200');
        assert.equal(res.text, '{"initNum":1,"initUnit":"kg","returnNum":2.20462,"returnUnit":"lbs","string":"1 kilograms converts to 2.20462 pounds"}');
        done();
      });
  });
});
