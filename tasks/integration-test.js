module.exports = function (grunt) {
  'use strict';

  var path = require('path');

  grunt.registerTask('integration-test', 'Run Hoodie\'s integration test suite', function() {

    grunt.loadTasks(path.join(__dirname, '../node_modules/grunt-subgrunt/tasks'));
    grunt.loadTasks(path.join(__dirname, '../node_modules/grunt-shell/tasks'));

    var integration = {};
    integration[path.join(__dirname, '../node_modules/hoodie-integration-test')] = 'default';

    grunt.config.set('subgrunt', {
      integration: integration
    });

    var pkg = grunt.file.readJSON('package.json');
    grunt.config.set('shell', {
      npmLink: {
        command: 'npm link && npm link ' + pkg.name
      },
      npmUnlink: {
        command: 'npm unlink && npm unlink ' + pkg.name
      }
    });

    grunt.task.run(['shell:npmLink', 'subgrunt:integration', 'shell:npmUnlink']);
  });

};
