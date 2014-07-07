# grunt-release-hoodie
[![Build Status](https://travis-ci.org/hoodiehq/grunt-release-hoodie.svg)](https://travis-ci.org/hoodiehq/grunt-release-hoodie)
[![Dependency Status](https://david-dm.org/hoodiehq/grunt-release-hoodie.svg)](https://david-dm.org/hoodiehq/grunt-release-hoodie)
[![devDependency Status](https://david-dm.org/hoodiehq/grunt-release-hoodie/dev-status.svg)](https://david-dm.org/hoodiehq/grunt-release-hoodie#info=devDependencies)

> Automatically configures the hoodie release process.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-release-hoodie --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-release-hoodie');
```

## The "release" task

### Overview
In your project's Gruntfile, add a section named `release` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  release: {}
})
```

### Options

#### options.bump
Type: `Object`
Default value:
```
bump: {
  commitMessage: 'chore(release): v%VERSION%',
  files: ['package.json', 'bower.json'],
  commitFiles: [
    'package.json',
    'bower.json',
    'CHANGELOG.md',
    'dist/*'
  ],
  pushTo: 'origin master'
}
```

The options object that gets forwarded to the [grunt-bump](https://github.com/vojtajina/grunt-bump) task.

#### options.tasks
Type: `Array<String>`
Default value: `['build']`

A list of tasks that get executed before releasing the version.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License
Copyright (c) 2014 Stephan Bönnemann. Licensed under the MIT license.
