# sta-webcam

SensorThings webcam dashboard in Ember.js.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

This app is designed to be deployed to Heroku or Heroku-like platforms such as Dokku.

    $ git remote add dokku dokku@beddington:sta-webcam
    $ ssh dokku@beddington apps:create sta-webcam
    $ ssh dokku@beddington domains:add sta-webcam webcam.geocens.ca
    $ ssh dokku@beddington config:set sta-webcam BUILDPACK_URL=https://github.com/tonycoco/heroku-buildpack-ember-cli.git
    $ git push dokku master

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
