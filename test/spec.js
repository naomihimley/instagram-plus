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

  it('relatedUsers returns users similar to / associated with a given user', function(done) {
    this.timeout(6000);
    client.relatedUsers(config.users.one.id, function (error, response, body) {
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


  it('timeline returns your own photostream', function(done) {
    this.timeout(6000);
    client.timeline(function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.have.property('items');
      done();
    })
  });

  it('myLikes returns all photos you\'ve liked', function(done) {
    this.timeout(6000);
    client.myLikes(function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.have.property('items');
      done();
    })
  });

  it('directMessages returns your direct message history', function(done) {
    this.timeout(6000);
    client.directMessages(function (error, response, body) {
      expect(body).to.have.property('inbox');
      done();
    })
  });

  it('geoData retuns geo data for all of a given user\'s media', function(done) {
    this.timeout(6000);
    client.geoData(config.users.one.id, function (error, response, body) {
      expect(body).to.have.property('geo_media');
      done();
    })
  });

  it('taggedPhotos returns all photos a given user is tagged in', function(done) {
    this.timeout(6000);
    client.taggedPhotos(config.users.one.id, function (error, response, body) {
      expect(body).to.have.property('items');
      done();
    })
  });

  it('searchFollowings returns all of a target user\'s followings that match a given query', function(done) {
    this.timeout(6000);
    client.searchFollowings(config.users.one.id, config.users.four.name, function (error, response, body) {
      expect(body).to.have.property('users');
      done();
    })
  });

  it('searchFollowers returns all of a target user\'s followers that match a given query', function(done) {
    this.timeout(6000);
    client.searchFollowers(config.users.one.id, config.users.four.name, function (error, response, body) {
      expect(body).to.have.property('users');
      done();
    })
  });

  it('stories returns all current user stories', function(done) {
    this.timeout(6000);
    client.stories(function (error, response, body) {
      expect(body).to.have.property('tray');
      done();
    })
  });
});
