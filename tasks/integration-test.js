module.exports = function (grunt) {
  'use strict';

  var path = require('path');

  grunt.registerTask('integration-test', 'Run Hoodie\'s integration test suite', function() {
    grunt.loadTasks(path.join(__dirname, '../node_modules/grunt-subgrunt/tasks'));
    grunt.loadTasks(path.join(__dirname, '../node_modules/grunt-shell/tasks'));

    var integration = {};
    var integrationPath = path.join(__dirname, '../node_modules/hoodie-integration-test');
    integration[integrationPath] = 'default';

    grunt.config.set('subgrunt', {
      integration: integration
    });

    var pkg = grunt.file.readJSON('package.json');
    var command =
      'npm link && ' +
      'cd ' + integrationPath + ' && ' +
      'npm link ' + pkg.name + ' && ' +
      'cd -';

    grunt.config.set('shell', {
      npmLink: {
        command: command
      },
      npmUnlink: {
        command: command.replace('npm link ', 'npm unlink ')
      }
    });

    grunt.task.run(['shell:npmLink', 'subgrunt:integration', 'shell:npmUnlink']);
  });

};
