var http = require('http');

var KEY = 'dc6zaTOxFJmzC';

module.exports = function(tag, cb) {
  http.get({
    hostname: 'api.giphy.com',
    path: '/v1/gifs/random?api_key=' + KEY + '&tag=' + encodeURIComponent(tag)
  }).on('response', function(res) {
    if (res.statusCode !== 200) {
      cb('request failed');
    }

    res.on('data', function(chunk) {
      var data = JSON.parse(chunk).data;
      if (!data) {
        return cb('no gif found');
      }
      if (data.rating && !/g/i.test(data.rating)) {
        return module.exports(tag, cb);
      }
      cb(null, data.image_url);
    });

  }).on('error', function(err) {
    cb(err);
  });
};
