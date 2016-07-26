var request = require('request');

module.exports = function () {

/* CONFIGS */
  var self = this;

  var buildOptions = function (path, method) {
    if (hasCredentials()){
      var options = {
        method: method,
        url: 'https://i.instagram.com/api/v1' + path,
        headers: {
          'cookie': self.cookie,
          'x-ig-capabilities': 'nw==',
          'connection': 'keep-alive',
          'user-agent': self.user_agent,
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'accept-language': 'en-US;q=1',
          'x-ig-connection-type': 'WiFi'
        }
      };
      return options;
    } else {
       throw new Error('Missing session ID');
    }
  };

  var hasCredentials = function () {
    return self.cookie != null;
  };

  this.config = function (settings) {
    self.cookie = settings.cookie;
    self.user_agent = settings.user_agent;
  };

  var _request = function (options, callback) {
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200){
        callback(null, JSON.parse(body))
      } else {
        callback(error, {statusCode: response.statusCode})
      }
    })
  }
  
  var get = function (path, callback) {
    var options = buildOptions(path, 'GET');
    _request(options, callback);
  };

  var post = function (path, payload, callback) {
    var options = buildOptions(path, 'POST');
    options.body = payload;
    _request(options, callbck);
  };

  /* returns your news feed. */
  this.getMyNews = function(callback) {
    get('/news/inbox/?', callback);
  };
  /* news about your friends activity */
  this.followingNews = function (callback) {
    get('/news/', callback);
  };
  /* get a list of all of a user's followers */
  this.followers = function (user, callback) {
    var url = '/friendships/'+ user +'/followers/';
    get(url, callback);
  };
  /* get a list of all of a user's followings */
  this.following = function (user, callback) {
    var url = '/friendships/'+ user +'/following/';
    get(url, callback);
  };
  /* shows your relationship to a given user */
  this.relationship = function (user, callback) {
    var url = '/friendships/show/'+ user +'/';
    get(url, callback);
  };
  /* fetches info about a given user */
  this.userInfo = function (user, callback) {
    var url = '/users/'+ user +'/info';
    get(url, callback);
  };
  /* the standard discover page. reccommended photos */
  this.discover = function (callback) {
    get('/discover/explore/?max_id=5&', callback);
  };
/* smart recommendations based on users networks */
  this.discoverChaining = function (user, callback) {
    var url = '/discover/chaining/?target_id=' + user;
    get(url, callback);
  };
/* a given user's photostream */
  this.userFeed = function (user, callback) {
    var url = '/feed/user/'+ user +'/';
    get(url, callback);
  };
/* your feed */
  this.timeline = function (callback) {
    get('/feed/timeline/', callback);
  };
/* returns all photos you've liked */
  this.myLikes = function (callback) {
    get('/feed/liked/', callback);
  };
/* returns information about a private message */
  this.directMessages = function (thread, callback) {
    var url = '/direct_v2/threads/'+ thread +'/';
    get(url, callback);
  };
/* returns the coordinates for all of a given user's photos */
  this.photoMap = function (user, callback) {
    var url = '/maps/user/'+ user +'/';
    get(url, callback);
  };
/* all tagged photos of a given user */
  this.taggedPhotos = function (user, callback) {
    var url = '/usertags/'+ user +'/feed/';
    get(url, callback);
  };
};