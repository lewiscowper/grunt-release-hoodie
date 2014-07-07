module.exports = function (grunt) {
  'use strict';

  var exec = require('child_process').exec;
  var fs = require('fs');
  var ncp = require('ncp').ncp;
  var path = require('path');

  var cacheDir;

  grunt.registerTask('dotfiles', 'Pulls in common files for the Hoodie repositories', function() {
    var opts = this.options({
      namespace: '.hoodie/',
      repoDir: 'dotfiles',
      repo: 'https://github.com/hoodiehq/hoodie-dotfiles.git'
    });

    var done = this.async();
    var queue = [];

    var next = function() {
      if (!queue.length) {
        return done();
      }

      queue.shift()();
    };

    var run = function(behavior) {
      queue.push(behavior);
    };

    var handleExec = function(err, stdout, stderr) {

      if (err) {
        grunt.log.debug('Fatal Fail:');
        grunt.fail.fatal(err);
      }

      if (stdout) {
        grunt.log.debug('Success:');
        grunt.log.write(stdout);
      }

      if (stderr) {
        grunt.log.debug('Fail:');
        grunt.log.warn(stderr);
      }

      next();
    };

    run(function() {
      grunt.log.debug('Verifying cache directory exists');

      require(path.join(__dirname, 'util/dir.js')).ensureCacheDir(opts.namespace, function(cacheDirOut) {
        grunt.log.debug('Directory exists');

        cacheDir = cacheDirOut;
        next();
      });
    });

    run(function() {
      grunt.log.debug('Cloning repo');

      if (fs.existsSync(path.join(cacheDir, opts.repoDir, '.git'))) {
        grunt.log.debug('Repo exists');

        return next();
      }

      exec('git clone ' + opts.repo + ' ' + opts.repoDir, {cwd: cacheDir}, handleExec);
    });

    run(function() {
      grunt.log.debug('Pulling latest changes');

      var cwd = path.join(cacheDir, opts.repoDir);
      exec('git pull origin master -f', {cwd: cwd}, handleExec);
    });

    run(function() {
      grunt.log.debug('Copying latest changes');

      ncp(path.join(cacheDir, opts.repoDir, 'static/'), '.', handleExec);
    });

    run(function() {
      grunt.log.debug('Adding latest changes');

      var files = fs.readdirSync(path.join(cacheDir, opts.repoDir, 'static'));
      exec('git add ' + files.join(' '), handleExec);
    });

    run(function() {
      grunt.log.debug('Check if files changed');

      exec('git diff --name-only --cached', function(err, stdout) {
        if (!stdout.trim().length) {
          grunt.log.debug('Nothing changed. My work is done here');
          return done();
        }

        handleExec.apply(this, arguments);
      });
    });

    run(function() {
      grunt.log.debug('Commiting latest changes');

      exec('git commit -m "chore(dotfiles): latest updates"', handleExec);
    });

    next();
  });
};
