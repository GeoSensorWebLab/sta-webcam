import DS from 'ember-data';

export default DS.Model.extend({
  feature: DS.attr(),

  observations: DS.hasMany('observation')
});
