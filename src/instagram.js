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
  this.getMyNews = function(callback) {
    get('/news/inbox/?', callback);
  };
/* returns your news feed. 
  response: status, oldStories, and newStories. nested objects like:
  {
      "pk": "K/PLaa/w8T4W6Wv/AKZfJrUI6lA=",
      "counts": {},
      "args": {
        "media": [
          {
            "original_width": 1080,
            "image": "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s150x150/e35/13741009_1732660540323657_1687222740_n.jpg?ig_cache_key=MTI5ODk0OTg4OTE1MzkyMjg4Mg%3D%3D.2",
            "id": "1298949889153922882_342562186",
            "original_height": 1080
          }
        ],
        "links": [
          {
            "start": 0,
            "end": 9,
            "id": "14053214",
            "type": "user"
          }
        ],
        "text": "mikexfinn liked your photo.",
        "profile_id": 14053214,
        "profile_image": "http://scontent-lga3-1.cdninstagram.com/t51.2885-19/11850272_384406841764431_1047596056_a.jpg",
        "timestamp": 1469067739.569135
      },
      "type": 1
    }
*/

};