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
          'user-agent': self.user_agent || 'Instagram 8.0.0 (iPhone8,1; iPhone OS 9_3; en_US; en-US; scale=2.00; 750x1334) AppleWebKit/420+',
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

  var _request = function (options, callback) {
    request(options, function (error, response, body) {
      callback(error, response, JSON.parse(body));
    })
  }

  var get = function (path, callback) {
    var options = buildOptions(path, 'GET');
    _request(options, callback);
  };

  var post = function (path, payload, callback) {
    var options = buildOptions(path, 'POST');
    options.body = payload;
    _request(options, callback);
  };

  var convertUsernameToId = function (username, callback) {
    self.searchByUsername(username, function (error, response, body) {
      if (body.users && body.users[0]){
        callback(error, body.users[0].user.pk)
      }
    })
  };

  this.config = function (settings) {
    self.cookie = settings.cookie;
    self.user_agent = settings.user_agent;
  };

  /* search for a user by username */
  this.searchByUsername = function  (query, callback) {
    get('/fbsearch/topsearch/?query=' + query, callback)
  }

  /* returns your news feed. */
  this.getMyNews = function(callback) {
    get('/news/inbox/?', callback);
  };

  /* news about your friends activity */
  this.followingNews = function (callback) {
    get('/news/', callback);
  };

  /* get a list of all of a user's followers */
  this.getFollowers = function (user, callback) {
    var path = '/friendships/'+ user +'/followers/';
    get(path, callback);
  };

  /* get a list of all of a user's followings */
  this.getFollowings = function (user, callback) {
    var path = '/friendships/'+ user +'/following/';
    get(path, callback);
  };

  /* shows your relationship to a given user */
  this.relationship = function (user, callback) {
    var path = '/friendships/show/'+ user;
    get(path, callback);
  };

  /* fetches info about a given user */
  this.userInfo = function (user, callback) {
    var path = '/users/'+ user +'/info';
    get(path, callback);
  };

  /* the standard discover page. reccommended photos */
  this.discover = function (callback) {
    get('/discover/explore/?max_id=5&', callback);
  };

/* smart recommendations based on users networks */
  this.discoverChaining = function (user, callback) {
    var path = '/discover/chaining/?target_id=' + user;
    get(path, callback);
  };

/* a given user's photostream */
  this.userFeed = function (user, callback) {
    var path = '/feed/user/'+ user;
    get(path, callback);
  };

/* your feed */
  this.timeline = function (callback) {
    get('/feed/timeline/', callback);
  };

/* returns all photos you've liked */
  this.myLikes = function (callback) {
    get('/feed/liked/', callback);
  };

/* returns all users who have viewed a given peice of media */
  this.viewers = function (id, callback) {
    get('/media/'+ id +'/list_reel_media_viewer/', callback);
  }

  //https://i.instagram.com/api/v1/direct_v2/inbox/
  this.directMessages = function (callback) {
    var path = '/direct_v2/inbox/';
    get(path, callback);
  };

/* returns information about a private message */
  this.messageThread = function (thread, callback) {
    var path = '/direct_v2/threads/'+ thread;
    get(path, callback);
  };

/* returns the coordinates for all of a given user's photos */
  this.photoMap = function (user, callback) {
    var path = '/maps/user/'+ user;
    get(path, callback);
  };

/* all tagged photos of a given user */
  this.taggedPhotos = function (user, callback) {
    var path = '/usertags/'+ user +'/feed/';
    get(path, callback);
  };

/* search a user's followings */
  this.searchFollowings = function (user, query, callback) {
    var path = '/friendships/' + user + '/following/?query=' + query;
    get(path, callback);
  }
/* search a user's followers */
  this.searchFollowers = function (user, query, callback) {
    var path = '/friendships/' + user + '/followers/?query=' + query;
    get(path, callback);
  }

};
