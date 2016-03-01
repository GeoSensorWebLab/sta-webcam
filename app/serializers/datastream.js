import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({

  // Edit links to add a sort order query parameter for Observations, then pass
  // off to ApplicationSerializer
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    payload.value.forEach(function(item) {
      item["Observations@iot.navigationLink"] += "?$orderby=phenomenonTime desc";
    });
    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
