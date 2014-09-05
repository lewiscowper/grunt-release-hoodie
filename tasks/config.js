'use strict';

var extend = require('extend');

var randomGif = require('./util/random-gif');

module.exports = function(grunt) {
  grunt.loadTasks(require('path').join(__dirname, '../node_modules/grunt-semantic-release/tasks'));

  var options = extend((grunt.config.get('release') || {}).options, {
    dotfiles: true,
    tasks: ['codename', 'changelog']
  });

  var config = {
    email: 'stephan@thehoodiefirm.com',
    name: 'Hoodie Bot',
    tasks:  options.tasks,
    payload: function(payload, cb) {
      var pkg = grunt.file.readJSON('./package.json');
      var searchTerm = pkg.codename.split('-');
      searchTerm = searchTerm[searchTerm.length-1];
      randomGif(searchTerm, function(err, res) {
        grunt.log.debug(err);
        if (res) {
          payload.body += '\n![' + pkg.codename + '](' + res + ')';
          payload.body += '\n![Powered by Giphy](http://i.imgur.com/x6PPiGK.gif)\n';
        }
        payload.name = payload.tag_name + (pkg.codename ? ' ' + pkg.codename : '');
        grunt.log.write(payload.body);
        cb(payload);
      });
    }
  };

  if (options.dotfiles) {
    if (grunt.task.exists && grunt.task.exists('jshint')) {
      config.tasks.unshift('jshint');
    }
    config.tasks.unshift('dotfiles');
  }

  grunt.config.set('release', config);
};
