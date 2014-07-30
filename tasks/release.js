module.exports = function(grunt) {
  grunt.registerTask('release', 'Schedules a release to be deployed by CI', function() {
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

    var task = 'bump';

    grunt.config.set(task, {options: bump});

    task = task + ':' + this.args.join(':');

    grunt.task.run([task]);
  });
};
