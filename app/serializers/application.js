import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: '@iot.id',

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    var newPayload = {};
    newPayload[primaryModelClass.modelName] = payload;

    return this._super(store, primaryModelClass, newPayload, id, requestType);
  }
});
