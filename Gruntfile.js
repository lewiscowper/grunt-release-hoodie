module.exports = function (grunt) {

  grunt.initConfig({
    release: {
      options: {
        bump: {
          files: ['package.json']
        },
        tasks: ['changelog']
      },
    }
  });

  grunt.loadTasks('tasks');

};
