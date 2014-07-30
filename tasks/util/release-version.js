var semverRegex = require('semver-regex')();

var exports = module.exports = function(tag) {
  if (!exports.regex.test(tag)) {
    return false;
  }
  var version = tag.match(exports.regex)[1];
  if (semverRegex.test(version)) {
    version.replace(/^v/,'');
    version = 'v' + version;
    return version;
  }
  return false;
};

exports.regex = /^release-v?(.+)$/;
