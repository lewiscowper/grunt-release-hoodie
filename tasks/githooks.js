module.exports = function(grunt) {
  'use strict';

  var fs = require('fs');
  var ncp = require('ncp');
  var path = require('path');

  grunt.registerTask('githooks', 'Configures hoodie project specific git hooks.', function() {
    var done = this.async();
    var hookPath = '.git/hooks/commit-msg';

    ncp(path.join(__dirname, 'assets/commit-msg-validation.js'), hookPath, function(err) {
      if (err) {
        grunt.fail.fatal(err);
      }

      fs.chmodSync(hookPath, '755');
      done();
    });
  });
};
