module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('integration-test', 'Run Hoodie\'s integration test suite', function() {

    grunt.loadTasks(require('path').join(__dirname, '../node_modules/grunt-subgrunt/tasks'));

    grunt.config.set('subgrunt', {
      integration: {
        'node_modules/hoodie-integration-test': 'default'
      }
    });

    grunt.task.run(['subgrunt:integration']);
  });

};
