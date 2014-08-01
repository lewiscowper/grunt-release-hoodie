- `npm install --save-dev grunt grunt-release-hoodie`
- If `Gruntfile.js` doesn't exist yet create a new one and load the task.
- `grunt githooks`
- `touch CHANGELOG.md`
- `git add package.json CHANGELOG.md Gruntfile.js`
- `git commit -m 'chore(grunt): set up release process'`
- make sure there is a "test" command in the package.json's script section
- create `.travis.yml`

```
before_install:
- npm install -g grunt-cli
before_deploy:
- grunt before-deploy
after_deploy:
- grunt after-deploy
language: node_js
node_js:
- '0.10'
notifications:
  email: false
```

- make sure travis cli is installed (`travis -v`, `gem install travis`)
- `travis encrypt GH_TOKEN={TOKEN} --add` (See Basecamp on how to obtain the token)
- `travis setup npm`: "stephan@thehoodiefirm.com", {TOKEN}, yes, no, yes (See Basecamp on how to obtain the token)
- In `.travis.yml` under deploy.on add `all_branches: true` (caused by a travis bug)
- Enable the repo `travis enable`
- Add *retina* badge to `README.md` 

```
[![Build Status](https://travis-ci.org/hoodiehq/{REPONAME}.svg)](https://travis-ci.org/hoodiehq/{REPONAME})
```

- `git add README.md .travis.yml`
- `git commit -m 'chore(travis): initial setup'`
- Add *retina* dependency badges 

```
[![Dependency Status](https://david-dm.org/hoodiehq/{REPONAME}.svg)](https://david-dm.org/hoodiehq/{REPONAME})
[![devDependency Status](https://david-dm.org/hoodiehq/{REPONAME}/dev-status.svg)](https://david-dm.org/hoodiehq/{REPONAME}#info=devDependencies)
```

- `git add README.md`
- `git commit -m 'docs(readme): add dependency badges'`
- `git push origin master`
