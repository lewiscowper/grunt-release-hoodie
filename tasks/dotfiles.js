
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

    run(function() {
      require(path.join(__dirname, 'util/dir.js')).ensureCacheDir(opts.namespace, function(cacheDirOut) {
        cacheDir = cacheDirOut;
        next();
      });
    });

    run(function() {
      if (fs.existsSync(path.join(cacheDir, opts.repoDir, '.git'))) {
        return next();
      }

      exec('git clone ' + opts.repo + ' ' + opts.repoDir, {cwd: cacheDir}, function(err, stdout, stderr) {
        grunt.log.write(JSON.stringify(arguments));
        next();
      });
    });

    run(function() {
      var cwd = path.join(cacheDir, opts.repoDir);
      exec('git pull origin master -f', {cwd: cwd}, function(err, stdout, stderr) {
        grunt.log.write(JSON.stringify(arguments));
        next();
      });
    });

    run(function() {
      ncp(path.join(cacheDir, opts.repoDir, 'static/'), '.', function(err) {
        next();
      });
    });

    run(function() {
      var files = fs.readdirSync(path.join(cacheDir, opts.repoDir, 'static'));
      exec('git add ' + files.join(' '), function(err, stdout, stderr) {
        next();
      });
    });

    run(function() {
      exec('git commit -m "chore(dotfiles): latest updates"', function(err, stdout, stderr) {
        next();
      });
    });

    next();

  });

};
