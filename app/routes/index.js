import Ember from 'ember';

var thing = {
  "@iot.selfLink": "http://chashuhotpot.sensorup.com/OGCSensorThings/v1.0/Things(1205774)",
  "Datastreams@iot.navigationLink": "../Things(1205774)/Datastreams",
  "@iot.id": 1205774,
  "description": "GeoSensorWeb Lab",
  "Locations@iot.navigationLink": "../Things(1205774)/Locations",
  "properties": {
    "openstreetmap@link": "http://www.openstreetmap.org/node/3044668378"
  },
  "HistoricalLocations@iot.navigationLink": "../Things(1205774)/HistoricalLocations"
};

export default Ember.Route.extend({
  model() {
    return this.store.findRecord("thing", 1205774);
  }
});
