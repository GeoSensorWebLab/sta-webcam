import Ember from 'ember';

export default Ember.Route.extend({
  init() {
    this.globalEvents.on('mqtt:subscribe', this, 'subscribe');
    this._super.apply(this, arguments);
  },

  model() {
    return this.store.findRecord("thing", 1205774);
  },

  subscribe(subPath) {
    console.log("Subscribe", subPath);

    
  }
});
