var semverSuggest = require('./util/semver-suggest');

module.exports = function(grunt) {
  grunt.registerTask('release', 'Schedules a release to be deployed by CI', function() {
    var done = this.async();

    grunt.loadTasks(require('path').join(__dirname, '../node_modules/grunt-bump/tasks'));

    var options = this.options({
      bump: {}
    });

    var bump = {
      files: options.bump.files || ['package.json'],
      commit: false,
      createTag: true,
      tagName: 'release-v%VERSION%',
      pushTo: options.bump.pushTo || 'origin master',
    };

    grunt.log.debug('Note: No pushing in debug mode');

    if (grunt.option('debug')) {
      bump.push = false;
    }

    grunt.registerTask('set-tag', function() {
      var pkg = grunt.file.readJSON('./package.json');
      grunt.option('deletetag', 'release-v'+pkg.version);
    });

    grunt.config.set('bump', {options: bump});
    var tasks = ['bump', 'set-tag','git-delete-tag:local'];

    if (!this.args.length) {
      return semverSuggest(grunt, function(suggestion) {
        if (suggestion === 'abort') {
          grunt.log.warn('Release aborted');
          return done();
        }
        tasks[0] = tasks[0] + ':' + suggestion;
        grunt.task.run(tasks);
        done();
      });
    }

    tasks[0] = tasks[0] + ':' + this.args.join(':');
    grunt.task.run(tasks);
    done();
  });
};
