var express = require('express');
var request = require('supertest');
var expires = require('../');

describe('expires-middleware', function () {
  it('should set the cache-control header for a number input', function (done) {
    var app = express()
      .use(expires(2000))
      .get('/', function (req, res) { res.send(200); });

    request(app)
      .get('/')
      .expect('Cache-Control', 'public, max-age=2')
      .expect(200)
      .end(done);
  });

  it('should set the cache-control header for a string input', function (done) {
    var app = express()
      .use(expires('2m'))
      .get('/', function (req, res) { res.send(200); });

    request(app)
      .get('/')
      .expect('Cache-Control', 'public, max-age=120')
      .expect(200)
      .end(done);
  });
});