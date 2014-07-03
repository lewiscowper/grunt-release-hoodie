module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('release', 'Automatically configures the hoodie release process.', function() {

    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-conventional-changelog');

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
      tasks: ['build']
    });

    for (var option in bump) {
      if (!options.bump[option]) {
        options.bump[option] = bump[option];
      }
    }

    grunt.config.set('bump', {options: options.bump});

    // Forward arguments to the bump-only task
    this.args.unshift('bump-only');
    options.tasks.unshift(this.args.join(':'));
    options.tasks.push('bump-commit');

    grunt.task.run(options.tasks);

  });

};
