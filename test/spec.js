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

});
