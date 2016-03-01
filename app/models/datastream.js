import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  description: DS.attr('string'),
  observationType: DS.attr('string'),
  unitOfMeasurement: DS.attr(),

  observations: DS.hasMany('observation'),
  'observed-property': DS.belongsTo('observed-property'),
  thing: DS.belongsTo('thing', { async: true }),
  sensor: DS.belongsTo('sensor'),

  lastObservation: Ember.computed('observations', function() {
    return this.get('observations.firstObject');
  })
});
