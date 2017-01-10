import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  observationType: DS.attr('string'),
  unitOfMeasurement: DS.attr(),

  // General Relationships
  observations: DS.hasMany('observation'),
  'observed-property': DS.belongsTo('observed-property'),
  thing: DS.belongsTo('thing', { async: true }),
  sensor: DS.belongsTo('sensor'),

  // Custom Relationships
  // This is a fake relationship we create by also adding a fake navigationLink
  // in the Datastream serializer, it lets Ember retrieve this model from the
  // server and only retrieve 1 entity instead of the latest 100 entities.
  // Retrieving 1 entity is noticeably faster.
  'last-observation': DS.hasMany('observation')
});
