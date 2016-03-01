import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  encodingType: DS.attr('string'),
  metadata: DS.attr('string'),

  datastreams: DS.hasMany('datastream', { async: true })
});
