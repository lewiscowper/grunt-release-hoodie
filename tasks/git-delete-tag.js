var exec = require('child_process').exec;

module.exports = function (grunt) {
  'use strict';
  grunt.registerTask('git-delete-tag', function() {
    var local = this.args.indexOf('local') !== -1;
    var remote = this.args.indexOf('remote') !== -1;
    if (!local && !remote) {
      local = remote = true;
    }
    var tag = grunt.option('deletetag') || process.env.TRAVIS_TAG;

    var done = this.async();
    var queue = [];
    var next = function() {
      if (!queue.length) {
        return done();
      }

      queue.shift()();
    };

    var handleExec = function(err, stdout, stderr) {
      if (err) {
        grunt.fail.fatal(err);
      }
      grunt.log.debug(stdout);
      grunt.log.debug(stderr);
      next();
    };

    if (local) {
      queue.push(function() {
        exec('git tag -d ' + tag, handleExec);
      });
    }

    if (remote) {
      queue.push(function() {
        exec('git push github :' + tag, handleExec);
      });
    }

    next();
  });
};
