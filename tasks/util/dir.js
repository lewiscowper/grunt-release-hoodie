require('shelljs/global');
var path = require('path');
var fs = require('fs');

//
// get is cache dir
//
exports.getHomeDir = function () {
  var homedir = 'HOME';

  if (process.platform === 'win32') {
    homedir = 'USERPROFILE';
  }

  return env[homedir];
};


//
// Ensure the cache directory exists. For first install on Windows, it doesn't.
//
exports.ensureCacheDir = function (cacheDirIn, callback) {
  var cacheDir = path.join(exports.getHomeDir(), cacheDirIn);

  if (!fs.existsSync(cacheDir)) {
    mkdir('-p', cacheDir);
  }

  return callback(cacheDir);
};
