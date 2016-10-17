var expect = require('chai').expect;
var instagram = require('../src/instagram');
var client = new instagram();
var config = require('../config');

client.config({
  cookie: config.credentials.cookie,
  user_agent: config.credentials.user_agent
});

describe('instagram', function() {

  it('getMyNews returns your news stories', function(done) {
    this.timeout(6000);
    client.getMyNews(function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.have.property('old_stories')
      done();
    })
  });

  it('searchByUsername returns users matching a query', function(done) {
    this.timeout(6000);
    client.searchByUsername(config.users.one.name, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.have.property('users')
      done();
    })
  });

  it('followingNews returns news about your friends activity', function(done) {
    this.timeout(6000);
    client.followingNews(function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.have.property('stories');
      done();
    })
  });

  it('getFollowers returns a given users followers', function(done) {
    this.timeout(6000);
    client.getFollowers(config.users.one.id, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.have.property('users');
      done();
    })
  });

  it('getFollowings returns a given users followings', function(done) {
    this.timeout(6000);
    client.getFollowings(config.users.one.id, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.have.property('users')
      done();
    })
  });


  it('relationship returns your relationship to a given user', function(done) {
    this.timeout(6000);
    client.relationship(config.users.one.id, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.have.property('followed_by');
      done();
    })
  });

  it('userInfo returns basic profile information for a given user', function(done) {
    this.timeout(6000);
    client.userInfo(config.users.one.id, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.have.property('user');
      done();
    })
  });

  it('discover returns media suggested by instagram', function(done) {
    this.timeout(6000);
    client.discover(function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.have.property('items');
      done();
    })
  });

  it('discoverChaining returns users similar to / associated with a given user', function(done) {
    this.timeout(6000);
    client.discoverChaining(config.users.one.id, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.have.property('users');
      done();
    })
  });

  it('photoStream returns a given user\'s media', function(done) {
    this.timeout(6000);
    client.photoStream(config.users.one.id, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.have.property('items');
      done();
    })
  });
});
