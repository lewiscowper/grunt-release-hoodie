module.exports = function (grunt) {
  'use strict';

  var path = require('path');

  grunt.registerTask('integration-test', 'Run Hoodie\'s integration test suite', function() {
    grunt.loadTasks(path.join(__dirname, '../node_modules/grunt-subgrunt/tasks'));
    grunt.loadTasks(path.join(__dirname, '../node_modules/grunt-shell/tasks'));

    var pkg = grunt.file.readJSON('package.json');
    var task = 'test';

    // These are the only to modules that do not require deep npm linking
    var deep = ['hoodie-cli', 'grunt-hoodie'].indexOf(pkg.name) === -1;

    if (deep) {
      task += ':'+pkg.name;
    }

    var integration = {};
    var integrationPath = path.join(__dirname, '../node_modules/hoodie-integration-test');
    integration[integrationPath] = task;

    grunt.config.set('subgrunt', {
      integration: integration
    });

    var command = 'npm link';

    if (!deep) {
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

    grunt.log.ok('Running with ' + (deep ? 'deep' : '') + 'linked dependencies');
    grunt.log.ok(command);
    grunt.task.run(['shell:npmLink', 'subgrunt:integration', 'shell:npmUnlink']);
  });

};
