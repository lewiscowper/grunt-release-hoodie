module.exports = function (grunt) {

  grunt.initConfig({
    release: {
      options: {
        bump: {
          files: ['package.json']
        },
        tasks: []
      },
    }
  });

  grunt.loadTasks('tasks');

};
