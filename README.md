# grunt-release-hoodie
[![Build Status](https://travis-ci.org/hoodiehq/grunt-release-hoodie.svg)](https://travis-ci.org/hoodiehq/grunt-release-hoodie)
[![Dependency Status](https://david-dm.org/hoodiehq/grunt-release-hoodie.svg)](https://david-dm.org/hoodiehq/grunt-release-hoodie)
[![devDependency Status](https://david-dm.org/hoodiehq/grunt-release-hoodie/dev-status.svg)](https://david-dm.org/hoodiehq/grunt-release-hoodie#info=devDependencies)

This plugin enables and configures [semantic releases](https://github.com/boennemann/grunt-semantic-release), [codename generation](tasks/codename.js), [integration tests](tasks/integration-test.js), [synced dotfiles](tasks/dotfiles.js) and [common githooks](tasks/githooks.js) for all hoodie packages.

## Getting Started
If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-release-hoodie --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-release-hoodie');
```

This task comes with a setup script. You should be good to go after running this.

```shell
./node_modules/.bin/setup
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
Default value: `['codename', 'changelog']`

A list of tasks that prepare files for the release commit.

#### options.dotfiles
Type: `Boolean`
Default value: true

Whether to pull in the default dotfiles or not.

## The "dotfiles" task

### Overview
In your project's Gruntfile, add a section named `dotfiles` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  dotfiles: {}
})
```

### Options

#### options.namespace
Type: `String`
Default value: `'.hoodie/'`

The location of where to cache the dotfiles inside your homefolder.

#### options.dotfiles
Type: `Array`
Default value: `'dotfiles'`

In which subfolder of `options.namespace` to clone the repo.

#### options.repo
Type: `String`
Default value: `'https://github.com/hoodiehq/hoodie-dotfiles.git'`

The repo where the dotfiles are.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License
Copyright (c) 2014 Stephan Bönnemann. Licensed under the Apache License 2.0 license.
