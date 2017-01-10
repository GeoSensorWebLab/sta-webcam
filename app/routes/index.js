import config from '../config/environment';
import Ember from 'ember';
import mqtt from 'npm:mqtt';

var inflector = new Ember.Inflector(Ember.Inflector.defaultRules);

// A Promise that will return a valid MQTT client after the connection is ready
var clientReady = new Promise(function(resolve) {
  var client = mqtt.connect(config.APP.mqttURL);
  client.on('connect', function () {
    resolve(client);
  });
});

export default Ember.Route.extend({
  // When the route is loaded, we listen for the mqtt:subscribe event triggered
  // by the datastream preview Ember component. This means only datastreams that
  // have a rendered preview component will have MQTT subscriptions active.
  init() {
    this.globalEvents.on('mqtt:subscribe', this, 'subscribe');

    clientReady.then((client) => {
      // When MQTT triggers an event, it is parsed to determine what kind of
      // entity.
      client.on('message', (topic, message) => {
        var parts = topic.split("/");
        var resource = parts[1];

        var entityName = inflector.singularize(resource.match(/[^(]+/)[0].toLowerCase());
        var entityID = resource.match(/\d+/)[0];

        // Parse the MQTT message into a new Observation model and manually add
        // it to Ember Data store
        if (entityName === "datastream") {
          var datastream = this.store.peekRecord("datastream", entityID);
          var object = JSON.parse(message.toString());

          var modelClass = this.store.modelFor("observation");
          var serializer = this.store.serializerFor("observation");
          var payload = serializer.normalizeSingleResponse(this.store, modelClass, object, object["@iot.id"]);
          var observation = this.store.push(payload);

          datastream.get('last-observation').pushObject(observation);
        }
      });
    });

    this._super.apply(this, arguments);
  },

  // Always return one specific Thing entity from SensorThings API.
  // This could be modified with the Ember app to retrieve *any* Thing entity,
  // but for this example app we only want to look at one entity.
  model() {
    return this.store.findRecord("thing", config.APP.defaultThingID);
  },

  // This is not an Ember function for a Route, but a custom one for triggering
  // an MQTT subscription.
  subscribe(subPath) {
    clientReady.then((client) => {
      client.subscribe("v1.0/" + subPath);
    });
  }
});
