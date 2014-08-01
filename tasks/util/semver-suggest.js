var ccl = require('conventional-changelog');
var exec = require('child_process').exec;

var exports = module.exports = function(grunt, cb) {
  exec('git fetch --tags', function(stderr) {
    if (stderr) {
      grunt.log.error('Could n\'t fetch tags.');
      grunt.log.error(stderr);
      // No need to abort though
    }
    grunt.log.ok('Latest tags pulled.');

    ccl({
      file: false,
      version: '13.3.7',
      log: grunt.log.debug
    }, function(err, log) {
      if (err) {
        cb(err);
      }

      if (/# breaking changes/i.test(log)) {
        grunt.log.ok('Breaking Changes detected.');
        return exports.suggest(grunt, true, 'major', cb);
      }
      if (/# features/i.test(log)) {
        grunt.log.ok('New features detected.');
        return exports.suggest(grunt, true, 'minor', cb);
      }
      if (!/# bug fixes/i.test(log)) {
        return exports.suggest(grunt, false, 'patch', cb);
      }

      grunt.log.ok('Bug fixes detected.');
      return exports.suggest(grunt, true, 'patch', cb);
    });
  });
};

exports.suggest = function(grunt, confident, type, cb) {
  var method = confident ? 'ok' : 'warn';
  var interval = confident ? 2e3 : 15e3;
  grunt.log[method]('You probably want to release a new ' + type + ' version.');

  if (confident) {
    grunt.log
      .ok('You have ' + interval/1e3 + ' seconds to cancel this (ctrl + c).');
  } else {
    grunt.log
      .warn('According to the changes made you shouldn\'t release a new version yet…')
      .warn('…or maybe you just didn\'t stick to the commit message conventions?')
      .warn('You have ' + interval/1e3 + ' seconds to cancel this (ctrl + c),')
      .warn('otherwhise a ' + type + ' version will be released.');
  }
  grunt.log[method]('Use `grunt release:major`, `grunt release:minor`, `grunt release:patch` or `grunt release --setversion=x.y.z` to release a specific version.');

  setTimeout(function() {
    cb(type);
  }, interval);
};
