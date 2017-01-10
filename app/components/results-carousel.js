import RecognizerMixin from 'ember-gestures/mixins/recognizers';
import Ember from 'ember';

export default Ember.Component.extend(RecognizerMixin, {
  classNames: ['results-carousel'],
  recognizers: 'swipe',
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

  isImage: Ember.computed('active-observation.result', function () {
    var result = this.get('active-observation.result');
    if (result) {
      return result.search(/\.(png|gif|jpg|jpeg)$/) !== -1;
    } else {
      return false;
    }
  }),

  actions: {
    loadNewer() {
      this.get('datastream.observations').reload();
    },

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
    if (this.get('datastream.observations').isFulfilled) {
      this.initActiveObservation();
    }
    this.addObserver('datastream.observations', this, 'initActiveObservation');
    this._super.apply(this, arguments);
  },

  didRender() {
    this._super(...arguments);
    this.willLoadImage();
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
  },

  willLoadImage() {
    if (this.get('isImage')) {
      this.$('img').one('load', () => {
        this.set('isLoading', false);
      });
    }
  }
});
