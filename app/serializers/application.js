import DS from 'ember-data';
import Ember from 'ember';

var inflector = new Ember.Inflector(Ember.Inflector.defaultRules);

function isLink(key) {
  return key.includes("@iot.navigationLink");
}

function extractLinks(payload) {
  payload.links = {};
  Object.keys(payload).filter(isLink).forEach(function(key) {
    var linkTo = key.split("@")[0].toLowerCase();
    payload.links[linkTo] = payload[key];
    delete payload[key];
  });

  return payload;
}

export default DS.RESTSerializer.extend({
  primaryKey: '@iot.id',

  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    var newPayload = {};
    var collectionName = inflector.pluralize(primaryModelClass.modelName);
    newPayload[collectionName] = payload.value.map(function(item) {
      return extractLinks(item);
    });

    return this._super(store, primaryModelClass, newPayload, id, requestType);
  },

  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
    var newPayload = {};
    payload = extractLinks(payload);
    newPayload[primaryModelClass.modelName] = payload;
    return this._super(store, primaryModelClass, newPayload, id, requestType);
  }
});
