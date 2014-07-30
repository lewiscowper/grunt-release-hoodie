var preparationTag = require('./util/preparation-tag');
var semverRegex = require('semver-regex')();

module.exports = function(grunt) {
  var tag = process.env.TRAVIS_TAG;
  var isPreparation = preparationTag(tag);
  var isRelease = semverRegex.test(tag);
  grunt.registerTask('before-deploy', function() {
    if (isPreparation) {
      grunt.log.ok('Preparing release ' + isPreparation);
      return grunt.task.run(['prepare-release']);
    }
    if (isRelease) {
      return grunt.log.ok('Realeasing new version ' + tag);
    }
    return grunt.fail.fatal('Invalid tag format used ' + tag);
  });

  grunt.registerTask('after-deploy', function() {
    if (isPreparation) {
      return grunt.log.ok(isPreparation + ' prepared');
    }
    if (isRelease) {
      grunt.log
        .ok(tag + ' released.')
        .ok('Publishing release to GitHub and cleaning up preparation tag');
      return grunt.task.run(['github-release']);
    }
    return grunt.fail.fatal('Invalid tag format used.');
  });
};
