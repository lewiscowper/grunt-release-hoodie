<a name="2.0.1"></a>
### 2.0.1 (2014-07-31)


<a name="2.0.0-alpha.1"></a>
### 2.0.0-alpha.1 (2014-07-31)


#### Bug Fixes

* **integration-test:** reenable ([173e0c4e](git@github.com:hoodiehq/grunt-release-hoodie/commit/173e0c4e0cfbfe1055c093e9ae4605a4739a09ba))


<a name="2.0.0"></a>
## 2.0.0 (2014-07-30)


#### Bug Fixes

* **ghrelease:** publish to right tag ([42da418c](git@github.com:hoodiehq/grunt-release-hoodie/commit/42da418c4a519cdda979dcb3dc557182dc11d576))
* **prepare-release:**
  * fix config normalisation ([fb9b863e](git@github.com:hoodiehq/grunt-release-hoodie/commit/fb9b863e7f793193e96971f2e466f5168ad9c67d))
  * push via "github" remote not url ([21ce0b66](git@github.com:hoodiehq/grunt-release-hoodie/commit/21ce0b66053b32acbfde0cf2e48870187b60a86d))
  * extract tag correctly ([3fa2ef96](git@github.com:hoodiehq/grunt-release-hoodie/commit/3fa2ef96f0bf420eeeaa9f2a7c257c17b687b04c))
* **release:**
  * delete local preparation tag right away ([0a3d2beb](git@github.com:hoodiehq/grunt-release-hoodie/commit/0a3d2beb908ff1e0376d9bad81073313f9dc1934))
  * delete preparation tag ([0aa5141d](git@github.com:hoodiehq/grunt-release-hoodie/commit/0aa5141d169f242722fd283ad2497caa2df2d3cb))
  * normalize version number ([b960693d](git@github.com:hoodiehq/grunt-release-hoodie/commit/b960693d28de0b94ed5cacc5b07cb3132fb381e6))
  * correctly set git identity ([7585f2e1](git@github.com:hoodiehq/grunt-release-hoodie/commit/7585f2e1bc8bdbd2be4174d123e4199fd805ba5e))
  * respect `pushTo` setting ([9ce30abb](git@github.com:hoodiehq/grunt-release-hoodie/commit/9ce30abbec34fa3679ffa745880c5367d30b0f0a))
* **scheduled-release:**
  * enforce pushing back ([673b57fc](git@github.com:hoodiehq/grunt-release-hoodie/commit/673b57fcb52ef0507f594212abc8c9c6140b00eb))
  * fetch config from release to maintain compat ([b0c2924a](git@github.com:hoodiehq/grunt-release-hoodie/commit/b0c2924abd1d8744e04016aa6c5f92d7d2cd3004))
  * no longer defaulting to `build` stuff ([e1d60f41](git@github.com:hoodiehq/grunt-release-hoodie/commit/e1d60f41112c932182c5d0080990740180419eeb))


#### Features

* **deploy:** before and after deploy tasks that handle everything ([63ec5705](git@github.com:hoodiehq/grunt-release-hoodie/commit/63ec57058693bad4a08a5ae2359eed8cd25d65d6))
* **release:** schedule the release only ([34848f74](git@github.com:hoodiehq/grunt-release-hoodie/commit/34848f74d9d7c56a3da311c9f9c14e1362e46241))
* **scheduled-release:** renamed release to scheduled-release ([f613cb0f](git@github.com:hoodiehq/grunt-release-hoodie/commit/f613cb0f20af94618b56aac8adfc4c39cb560404))


<a name="1.6.2"></a>
### 1.6.2 (2014-07-30)


#### Bug Fixes

* **integration-test:** disable to stop failing builds due to config fails ([b9b93a1b](git@github.com:hoodiehq/grunt-release-hoodie/commit/b9b93a1b58f227ab7d08c99dac5d54a89334cd20))


<a name="1.6.1"></a>
### 1.6.1 (2014-07-30)


#### Bug Fixes

* **ghrelease:** no "undefined" release for locally cached older release plugin ([2f1eb293](git@github.com:hoodiehq/grunt-release-hoodie/commit/2f1eb293072f585debe74bf09e78a4ceab9fb0b5))


<a name="1.6.0"></a>
## 1.6.0 (2014-07-28)


#### Features

* **codename:**
  * add codename to ghrelease ([51b12547](git@github.com:hoodiehq/grunt-release-hoodie/commit/51b12547af75108db4024c0ba348d7d15f41d102))
  * add codename on release ([c5caac00](git@github.com:hoodiehq/grunt-release-hoodie/commit/c5caac00b5296d58036ee50ca3b0317fe1acab48))
  * generate codename ([61971209](git@github.com:hoodiehq/grunt-release-hoodie/commit/6197120982ddf28564813c475916122d0bc40d4b))


<a name="1.5.1"></a>
### 1.5.1 (2014-07-23)


#### Bug Fixes

* **integration-test:** link in correct location ([cd8e0882](git@github.com:hoodiehq/grunt-release-hoodie/commit/cd8e088240ab82270806379062a8c8f4399bd937))


<a name="1.5.0"></a>
## 1.5.0 (2014-07-23)


#### Features

* **integration-test:** npm link currently tested package ([41a25522](git@github.com:hoodiehq/grunt-release-hoodie/commit/41a2552221bd8860605ba6ffebbcf4f64588fbad))


<a name="1.4.1"></a>
### 1.4.1 (2014-07-21)


#### Bug Fixes

* **integration-test:** use absolute path for subgrunt location ([af923c35](git@github.com:hoodiehq/grunt-release-hoodie/commit/af923c35cfab0f1c49d787902431b35d43cd686d))


<a name="1.4.0"></a>
## 1.4.0 (2014-07-17)


#### Features

* **integration-test:** inital ([8c755ef2](git@github.com:hoodiehq/grunt-release-hoodie/commit/8c755ef249fa4cc0a0da7299dd8c6c8051f71b10))


<a name="1.3.1"></a>
### 1.3.1 (2014-07-14)


<a name="1.3.0"></a>
## 1.3.0 (2014-07-11)


#### Features

* **githooks:**
  * add sponsor message script to hook ([5a57500f](git@github.com:hoodiehq/grunt-release-hoodie/commit/5a57500fb1ca328a5ea850c954d3abafd023519c))
  * add commit message validation (borrowed from angular) ([0fedf9f0](git@github.com:hoodiehq/grunt-release-hoodie/commit/0fedf9f0f286f253e26136b9ccb89049c15c38fe))


<a name="1.2.0"></a>
## 1.2.0 (2014-07-09)


#### Features

* **ghrelease:** add debug mode where releases are published as drafts ([9d9c940d](git@github.com:hoodiehq/grunt-release-hoodie/commit/9d9c940d5b584b63d2e166c02a3e2e0a97554f33))


<a name="1.1.0"></a>
## 1.1.0 (2014-07-09)


#### Features

* **ghrelease:** add task that creates github release with latest changelog additions ([16d3ba22](git@github.com:hoodiehq/grunt-release-hoodie/commit/16d3ba22529d540607db3a51667262e84cf98a19))


<a name="1.0.1"></a>
### 1.0.1 (2014-07-07)


#### Bug Fixes

* **dotfiles:** don't break for unchanged dotfiles ([fecb0508](git@github.com:hoodiehq/grunt-release-hoodie/commit/fecb050877dc84921056e13169b444a011e11854))


<a name="1.0.0"></a>
## 1.0.0 (2014-07-07)


#### Features

* **dotfiles:**
  * handle errors ([81b858d9](git@github.com:hoodiehq/grunt-release-hoodie/commit/81b858d925fddb7595b72c5642be8d45c3dd6e95))
  * pull in dotfiles from central repo ([b92a5513](git@github.com:hoodiehq/grunt-release-hoodie/commit/b92a5513845989069277dd8579e2da6a22e002db))
* **release:** release task adds dotfiles per default ([8eaf7b29](git@github.com:hoodiehq/grunt-release-hoodie/commit/8eaf7b29a4def08447cac949bf17b187c2723758))


<a name="0.1.1"></a>
### 0.1.1 (2014-07-04)


#### Bug Fixes

* **task:** manually load npm tasks ([0611692e](git@github.com:hoodiehq/grunt-release-hoodie/commit/0611692eb64ac428ab6755b48d5553f8661c01f0))


<a name="0.1.0"></a>
## 0.1.0 (2014-07-04)


#### Features

* **task:** add debug mode for sanity ([b97afdc4](git@github.com:hoodiehq/grunt-release-hoodie/commit/b97afdc4c8ffcae7ee41bc7c5d1d8094108897b6))


