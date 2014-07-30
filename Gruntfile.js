module.exports = function (grunt) {

  grunt.initConfig({
    release: {
      options: {
        bump: {
          files: ['package.json'],
          commitFiles: [
            'package.json',
            'CHANGELOG.md'
          ]
        }
      },
    }
  });

  grunt.loadTasks('tasks');

};
