module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('release', 'Automatically configures the hoodie release process.', function() {

    var isSelf = grunt.file.readJSON('package.json').name === 'grunt-release-hoodie';
    var externalTasks = ['grunt-bump', 'grunt-conventional-changelog'];

    var prefix = 'node_modules/grunt-release-hoodie/node_modules/';
    var postfix = '/tasks';

    externalTasks.forEach(function(task) {
      if (isSelf) {
        grunt.loadNpmTasks(task);
      } else {
        grunt.loadTasks(prefix + task + postfix);
      }
    });

    var bump = {
      commitMessage: 'chore(release): v%VERSION%',
      files: ['package.json', 'bower.json'],
      commitFiles: [
        'package.json',
        'bower.json',
        'CHANGELOG.md',
        'dist/*'
      ],
      pushTo: 'origin master'
    };

    var options = this.options({
      bump: {},
      tasks: ['build', 'changelog']
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

    // Forward arguments to the bump-only task
    this.args.unshift('bump-only');
    options.tasks.unshift(this.args.join(':'));
    options.tasks.push('bump-commit');

    grunt.log.debug(
      'Running the following tasks: ' +
      grunt.log.wordlist(options.tasks)
    );

    grunt.task.run(options.tasks);

  });

};
