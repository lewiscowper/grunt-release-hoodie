module.exports = function (grunt) {

  grunt.initConfig({
    release: {
      options: {
        bump: {
          files: ['package.json'],
          pushTo: 'origin release-on-ci'
        }
      },
    }
  });

  grunt.loadTasks('tasks');

};
