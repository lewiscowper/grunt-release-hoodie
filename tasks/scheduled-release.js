var releaseVersion = require('./util/release-version');

module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('scheduled-release', 'Preparing the release for Continous Deployment', function() {

    ['grunt-bump', 'grunt-conventional-changelog'].forEach(function(task) {
      grunt.loadTasks(require('path').join(__dirname, '../node_modules', task, 'tasks'));
    });

    var version = releaseVersion(process.env.TRAVIS_TAG);
    if (!version) {
      grunt.fail.fatal('No release scheduled. Refusing to release.');
    }

    grunt.log.ok('Preparing release for ' + version);
    grunt.option('setversion', version);

    var bump = {
      commitMessage: 'chore(release): v%VERSION%',
      files: ['package.json', 'bower.json'],
      commitFiles: [
        'package.json',
        'bower.json',
        'CHANGELOG.md',
        'dist/*'
      ],
      pushTo: 'https://' + process.env.GH_TOKEN + '@github.com/' + process.env.TRAVIS_REPO_SLUG
    };

    var options = this.options({
      bump: {},
      dotfiles: true,
      tasks: ['codename', 'changelog']
    });

    for (var option in bump) {
      if (!options.bump[option]) {
        options.bump[option] = bump[option];
      }
    }

    grunt.log.debug('Note: No comitting, tagging or pushing in debug mode');
    grunt.log.debug(
      'Using the following options for grunt-bump:\n' +
      JSON.stringify(options.bump, null, 2)
    );

    if (grunt.option('debug')) {
      options.bump.commit = options.bump.createTag = options.bump.push = false;
    }

    grunt.config.set('bump', {options: options.bump});

    options.tasks.unshift('bump-only');
    options.tasks.push('bump-commit');

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
