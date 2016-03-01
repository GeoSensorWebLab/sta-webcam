import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this.addObserver("datastream", this, "modelLoaded");
    this.modelLoaded();

    this._super.apply(this, arguments);
  },

  // Send an event to the global bus to subscribe to an MQTT stream
  modelLoaded() {
    var id = this.get("datastream.id");
    this.globalEvents.trigger("mqtt:subscribe", `Datastreams(${id})/Observations`);
  },

  willDestroy() {
    var id = this.get("datastream.id");
    this.globalEvents.trigger("mqtt:unsubscribe", `Datastreams(${id})/Observations`);
  }
});
