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

  grunt.registerTask('default', function() {
    grunt.log
      .ok()
      .write('Don\'t mind me. I\'m just here for deployments...');
  });

};
