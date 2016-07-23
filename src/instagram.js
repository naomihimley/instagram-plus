var request = require('request');

module.exports = function () {

/* CONFIGS */
  var self = this;

  var buildOptions = function (path, method) {
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
  };

  this.config = function (settings) {
    self.cookie = settings.cookie;
    self.user_agent = settings.user_agent;
  };

  var get = function (path, callback) {
    var options = buildOptions(path, 'GET');
    request(options, function (error, response, body) {
      var obj = JSON.parse(body);
      callback(error, obj);
    });
  };

/* GETS */
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
};