import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  observationType: DS.attr('string'),
  unitOfMeasurement: DS.attr(),

  'observed-property': DS.belongsTo('observed-property'),
  thing: DS.belongsTo('thing', { async: true }),
  sensor: DS.belongsTo('sensor')
});
