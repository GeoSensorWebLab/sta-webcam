/*jshint node:true*/
/* global require, module */
var EmberApp   = require('ember-cli/lib/broccoli/ember-app');
var concat     = require('broccoli-concat');
var funnel     = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    fingerprint: {
      enabled: false
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // == Funnel external libraries into individual trees ==
  var defaultOptions = {
    include: [
      "**/*.css",
      "**/*.js",
      "**/*.map"
    ]
  };

    var bootstrap = funnel('node_modules/bootstrap/dist', defaultOptions);
    var leaflet = funnel('node_modules/leaflet/dist', defaultOptions);

    var libraryTree = mergeTrees([
    bootstrap,
    leaflet
  ]);

  // == Concatenate script trees ==
  // Use inputFiles to specify loading order.

  var allScripts = concat(mergeTrees([
    libraryTree
  ]), {
    inputFiles: [
      'leaflet-src.js'
    ],
    outputFile: 'app.js'
  });

  // == Concatenate style trees ==
  // Use inputFiles to specify loading order.

  var allStyles = concat(libraryTree, {
    inputFiles: [
      'css/bootstrap.css',
      'leaflet.css'
    ],
    outputFile: 'style.css',
    sourceMapConfig: {
      extensions: ['css'],
      mapCommentType: 'block'
    }
  });

  // == Funnel external assets into individual trees ==

  var bootstrapFonts = funnel('node_modules/bootstrap/dist/fonts', {
    destDir: 'fonts'
  });

  var leafletAssets = funnel('node_modules/leaflet/dist/images', {
    destDir: 'images'
  });

  return app.toTree([allStyles, allScripts, bootstrapFonts, leafletAssets]);
};
