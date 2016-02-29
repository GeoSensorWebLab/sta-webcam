import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  encodingType: DS.attr('string'),
  location: DS.attr(),

  thing: DS.belongsTo('thing', { async: true })
});
