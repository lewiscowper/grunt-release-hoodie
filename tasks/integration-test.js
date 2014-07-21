module.exports = function (grunt) {
  'use strict';

  var path = require('path');

  grunt.registerTask('integration-test', 'Run Hoodie\'s integration test suite', function() {

    grunt.loadTasks(path.join(__dirname, '../node_modules/grunt-subgrunt/tasks'));

    var integration = {};
    integration[path.join(__dirname, '../node_modules/hoodie-integration-test')] = 'default';

    grunt.config.set('subgrunt', {
      integration: integration
    });

    grunt.task.run(['subgrunt:integration']);
  });

};
