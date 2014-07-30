var extend = require('extend');
var exec = require('child_process').exec;
var path = require('path');
var preparationTag = require('./util/preparation-tag');

module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('prepare-release', 'Preparing the release for Continous Deployment', function() {

    ['grunt-bump', 'grunt-conventional-changelog'].forEach(function(task) {
      grunt.loadTasks(require('path').join(__dirname, '../node_modules', task, 'tasks'));
    });

    grunt.registerTask('git-identity', function() {
      var done = this.async();
      exec(path.join(__dirname, 'util/git-identity'), function(err, stdout, stderr) {
        if (err) {
          grunt.fail.fatal(err);
        }
        grunt.log.debug(stdout);
        grunt.log.debug(stderr);
        done();
      });
    });

    var version = preparationTag(process.env.TRAVIS_TAG);
    grunt.option('setversion', version);

    var bump = {
      commitMessage: 'chore(release): v%VERSION%',
      files: ['package.json', 'bower.json'],
      commitFiles: [
        'package.json',
        'bower.json',
        'CHANGELOG.md',
        'dist/*'
      ]
    };

    var options = grunt.config.get('release');

    extend(options, {
      bump: {},
      dotfiles: true,
      tasks: ['codename', 'changelog']
    });

    for (var option in bump) {
      if (!options.bump[option]) {
        options.bump[option] = bump[option];
      }
    }

    options.bump.pushTo = 'https://' + process.env.GH_TOKEN + '@github.com/' + process.env.TRAVIS_REPO_SLUG;

    grunt.log.debug('Note: No comitting, tagging or pushing in debug mode');
    grunt.log.debug(
      'Using the following options for grunt-bump:\n' +
      JSON.stringify(options.bump, null, 2)
    );

    options.tasks.unshift('bump-only');
    options.tasks.push('bump-commit');

    if (grunt.option('debug')) {
      options.bump.commit = options.bump.createTag = options.bump.push = false;
    } else {
      options.tasks.unshift('git-identity');
    }

    grunt.config.set('bump', {options: options.bump});

    if (options.dotfiles && !grunt.option('debug')) {
      options.tasks.unshift('dotfiles');
    }

    grunt.log.debug(
      'Running the following tasks: ' +
      grunt.log.wordlist(options.tasks)
    );

    grunt.task.run(options.tasks);

  });

};
