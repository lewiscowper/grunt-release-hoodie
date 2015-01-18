module.exports = function (grunt) {
  'use strict';

  var path = require('path');

  grunt.registerTask('integration-test', 'Run Hoodie\'s integration test suite', function() {
    // TMP DISABLE UNTIL INTEGRATION TESTS FIXED — @janl
    return;
    grunt.loadTasks(path.join(__dirname, '../node_modules/grunt-subgrunt/tasks'));
    grunt.loadTasks(path.join(__dirname, '../node_modules/grunt-shell/tasks'));

    var pkg = grunt.file.readJSON('package.json');
    var task = 'test';

    // These are the only modules that do not require deep npm linking
    var flat = ['hoodie-cli', 'grunt-hoodie'].indexOf(pkg.name) !== -1;

    if (!flat) {
      task += ':'+pkg.name;
    }

    var integration = {};
    var integrationPath = path.join(__dirname, '../node_modules/hoodie-integration-test');
    integration[integrationPath] = task;

    grunt.config.set('subgrunt', {
      integration: integration
    });

    var command = 'npm link';

    if (flat) {
      command += ' && cd ' + integrationPath + ' && npm link ' + pkg.name + ' && cd -';
    }

    grunt.config.set('shell', {
      npmLink: {
        command: command
      },
      npmUnlink: {
        command: command.replace('npm link ', 'npm unlink ')
      }
    });

    grunt.log.ok('Running with ' + (flat ? '' : 'deep') + 'linked dependencies');
    grunt.log.ok(command);
    grunt.task.run(['shell:npmLink', 'subgrunt:integration', 'shell:npmUnlink']);
  });

};
