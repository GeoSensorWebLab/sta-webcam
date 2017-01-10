# sta-webcam

SensorThings API webcam dashboard in Ember.js. See a live demo:

http://webcam.geocens.ca/

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone https://github.com/GeoSensorWebLab/sta-webcam` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Customization

Inside `config/environment.js` there are four variables that should be customized:

```javascript
APP: {
  // Here you can pass flags/options to your application instance
  // when it is created
  defaultThingID: 620900,
  mqttURL: 'ws://scratchpad.sensorup.com:9001',
  staPath: 'OGCSensorThings/v1.0',
  staURL: 'http://scratchpad.sensorup.com'
}
```

These define what entity will be displayed by default. The app assumes the SensorThings API instance also has MQTT support.

You should also customize `app/templates/application.hbs` and change the maintainer information. DO NOT leave "GeoSensorWeb Lab" in the footer if you are running this app in production!

## Deploying

This app is designed to be deployed to Heroku or Heroku-like platforms such as Dokku.

Here are the basic instructions for GeoSensorWeb Lab, where `beddington` is an SSH alias.

    $ git remote add dokku dokku@beddington:sta-webcam
    $ ssh dokku@beddington apps:create sta-webcam
    $ ssh dokku@beddington domains:add sta-webcam webcam.geocens.ca
    $ ssh dokku@beddington config:set sta-webcam BUILDPACK_URL=https://github.com/tonycoco/heroku-buildpack-ember-cli.git
    $ git push dokku master

## License

This application is published under the MIT License.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
