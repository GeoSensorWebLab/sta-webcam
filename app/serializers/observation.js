import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({

  // Edit links then pass off to ApplicationSerializer
  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
    // Force inclusion of FeatureOfInterest link
    payload["FeatureOfInterest@iot.navigationLink"] = payload["@iot.selfLink"] + "/FeatureOfInterest";
    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
