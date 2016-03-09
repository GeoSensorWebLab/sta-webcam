import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['results-carousel'],

  observations: Ember.computed('datastream.observations', function () {
    return this.get('datastream.observations').sortBy('phenomenonTime');
  }),

  hasNextObservation: Ember.computed('observations', 'activeObservation', function() {
    var observations = this.get('observations');
    var active = this.get('activeObservation');
    var index = observations.indexOf(active);
    return observations.objectAt(index + 1) !== undefined;
  }),

  hasPreviousObservation: Ember.computed('observations', 'activeObservation', function() {
    var observations = this.get('observations');
    var active = this.get('activeObservation');
    var index = observations.indexOf(active);
    return observations.objectAt(index - 1) !== undefined;
  }),

  init() {
    this.get('datastream.observations');
    this.addObserver('datastream.observations', this, 'initActiveObservation');
    this._super.apply(this, arguments);
  },

  // set the initially active observation after the observation have been
  // fetched. This only happens once.
  initActiveObservation() {
    this.set('activeObservation', this.get('observations.lastObject'));
    this.removeObserver('datastream.observations', this, 'initActiveObservation');
  }
});
