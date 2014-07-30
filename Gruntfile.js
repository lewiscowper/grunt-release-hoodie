module.exports = function (grunt) {

  grunt.initConfig({
    release: {
      options: {
        bump: {
          files: ['package.json']
        }
      },
    }
  });

  grunt.loadTasks('tasks');

};
