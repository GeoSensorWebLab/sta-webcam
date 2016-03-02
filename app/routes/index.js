import Ember from 'ember';
import mqtt from 'npm:mqtt';

var inflector = new Ember.Inflector(Ember.Inflector.defaultRules);

var clientReady = new Promise(function(resolve) {
  var client = mqtt.connect('ws://52.27.116.47:9001');
  client.on('connect', function () {
    resolve(client);
  });
});

export default Ember.Route.extend({
  init() {
    this.globalEvents.on('mqtt:subscribe', this, 'subscribe');

    clientReady.then((client) => {
      client.on('message', (topic, message) => {
        var parts = topic.split("/");
        var resource = parts[1];

        var entityName = inflector.singularize(resource.match(/[^(]+/)[0].toLowerCase());
        var entityID = resource.match(/\d+/)[0];

        if (entityName === "datastream") {
          this.store.findRecord("datastream", entityID).then((datastream) => {
            var object = JSON.parse(message.toString());
            var modelClass = this.store.modelFor("observation");
            var serializer = this.store.serializerFor("observation");

            var payload = serializer.normalizeSingleResponse(this.store, modelClass, object, object["@iot.id"]);
            var observation = this.store.push(payload);
            datastream.get('last-observation').pushObject(observation);
          });
        }
      });
    });

    this._super.apply(this, arguments);
  },

  model() {
    return this.store.findRecord("thing", 1205774);
  },

  subscribe(subPath) {
    clientReady.then((client) => {
      client.subscribe("v1.0/" + subPath);
    });
  }
});
