import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['results-carousel'],
  isLoading: true,

  observations: Ember.computed('datastream.observations', function () {
    return this.get('datastream.observations').sortBy('phenomenonTime');
  }),

  hasNextObservation: Ember.computed('observations', 'active-observation', function() {
    return this.getActiveOffset(1) !== undefined;
  }),

  hasPreviousObservation: Ember.computed('observations', 'active-observation', function() {
    return this.getActiveOffset(-1) !== undefined;
  }),

  actions: {
    loadNext() {
      var next = this.getActiveOffset(1);
      if (next) {
        this.set('active-observation', next);
        this.set('isLoading', true);
      }
    },

    loadPrevious() {
      var previous = this.getActiveOffset(-1);
      if (previous) {
        this.set('active-observation', previous);
        this.set('isLoading', true);
      }
    }
  },

  init() {
    this.get('datastream.observations');
    this.addObserver('datastream.observations', this, 'initActiveObservation');
    this._super.apply(this, arguments);
  },

  didInsertElement() {
    this.$('img').on('load', () => {
      this.set('isLoading', false);
    });
  },

  // set the initially active observation after the observation have been
  // fetched. This only happens once.
  initActiveObservation() {
    this.set('active-observation', this.get('observations.lastObject'));
    this.removeObserver('datastream.observations', this, 'initActiveObservation');
  },

  // Return the observation in the observations array that is offset by index
  // "offset"
  getActiveOffset(offset) {
    var observations = this.get('observations');
    var active = this.get('active-observation');
    var index = observations.indexOf(active);
    return observations.objectAt(index + offset);
  }
});
