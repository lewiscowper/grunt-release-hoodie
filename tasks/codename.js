module.exports = function(grunt) {
  'use strict';
  var superb = require('superb');
  var animals = require('animals');

  grunt.registerTask('codename', 'generate cool codename', function() {
    var pkg = grunt.file.readJSON('./package.json');
    pkg.codename = superb() + '-' + animals();
    grunt.log.write('The new codename is ' + pkg.codename);
    grunt.file.write('./package.json', JSON.stringify(pkg, null, 2));
  });
};
