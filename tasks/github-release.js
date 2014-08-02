module.exports = function(grunt) {
  'use strict';

  var exec = require('child_process').exec;
  var GitHubApi = require('github');

  var github = new GitHubApi({
    version: '3.0.0',
    debug: true
  });

  var randomGif = require('./util/random-gif');

  grunt.registerTask('github-release', 'Creates a Github release.', function() {
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

    var changes;
    var slug = (process.env.TRAVIS_REPO_SLUG || '').split('/');
    var owner = slug[0];
    var repo = slug[1];
    var tag = process.env.TRAVIS_TAG;
    var token = process.env.GH_TOKEN;
    var pkg = grunt.file.readJSON('./package.json');
    var name = tag + (pkg.codename ? ' ' + pkg.codename : '');

    grunt.log.debug('Publishing ' + tag + ' for ' + owner + '/' + repo);

    run(function() {
      // extract latest addition to changelog from git diff
      exec('git diff -U0 --no-color HEAD^ CHANGELOG.md', function(err, stdout, stderr) {
        if (err) {
          grunt.fail.fatal(err);
        }

        changes = stdout.split('\n');
        changes.splice(0, 5);
        changes = changes.join('\n').replace(/^\+/gm, '');

        grunt.log.debug(stdout);
        grunt.log.debug(stderr);
        grunt.log.write(changes);

        next();
      });
    });

    run(function() {
      var searchTerm = pkg.codename.split('-');
      searchTerm = searchTerm[searchTerm.length-1];
      randomGif(searchTerm, function(err, res) {
        if (res) {
          changes += '\n![' + pkg.codename + '](' + res + ')';
          changes += '\n![Powered by Giphy](http://i.imgur.com/x6PPiGK.gif)\n';
        }
        next();

        console.log(changes);
      });
    });

    run(function() {
      github.authenticate({
        type: 'oauth',
        token: token
      });
      github.releases.createRelease({
        owner: owner,
        repo: repo,
        tag_name: tag,
        name: name,
        body: changes,
        draft: grunt.option('debug')
      }, function(err) {
        if (err) {
          grunt.fail.fatal(err);
        }

        grunt.log.ok('GitHub release published');

        next();
      });
    });

    next();
  });
};
