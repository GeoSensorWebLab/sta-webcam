import DS from 'ember-data';

export default DS.Model.extend({
  parameters: DS.attr(),
  phenomenonTime: DS.attr('date'),
  result: DS.attr(),
  resultQuality: DS.attr(),
  resultTime: DS.attr('date'),
  validTime: DS.attr(),

  datastreams: DS.belongsTo('datastream', { inverse: 'observations' }),
  'feature-of-interest': DS.belongsTo('feature-of-interest')
});
