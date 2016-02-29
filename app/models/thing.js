import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  description: DS.attr('string'),
  properties: DS.attr(),

  locations: DS.hasMany('location', { async: true }),

  firstLocation: Ember.computed('locations', function() {
    return this.get('locations.firstObject');
  })
});
