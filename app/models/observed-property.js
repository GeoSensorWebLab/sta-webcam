import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  definition: DS.attr('string'),
  name: DS.attr('string'),

  datastreams: DS.hasMany('datastream', { async: true })
});
