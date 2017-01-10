import ApplicationSerializer from './application';

function addLinks(payload) {
  // Add link for latest (by phenomenonTime) item. This makes Ember Data's async
  // retrieve a smaller response from SensorThings API.
  payload["LastObservation@iot.navigationLink"] = payload["Observations@iot.navigationLink"] + "?$orderby=phenomenonTime desc&$top=1";
  // Add sorting for observations collection
  payload["Observations@iot.navigationLink"] += "?$orderby=phenomenonTime desc";
  return payload;
}

export default ApplicationSerializer.extend({

  // Edit links to add a sort order query parameter for Observations, then pass
  // off to ApplicationSerializer
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    payload.value.forEach(function(item) {
      item = addLinks(item);

    });
    return this._super(store, primaryModelClass, payload, id, requestType);
  },

  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
    payload = addLinks(payload);
    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
