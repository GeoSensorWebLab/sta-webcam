import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
  host: "http://chashuhotpot.sensorup.com",
  namespace: "OGCSensorThings/v1.0",

  _buildURL: function(type, id) {
    var url = [];
    var host = Ember.get(this, 'host');
    var prefix = this.urlPrefix();
    var path;

    if (type) {
      path = this.pathForType(type);
      if (path) { url.push(path); }
    }

    if (prefix) { url.unshift(prefix); }

    url = url.join('/');
    if (!host && url && url.charAt(0) !== '/') {
      url = '/' + url;
    }

    if (id) {
      var encoded = encodeURIComponent(id);
      url += `(${encoded})`;
    }

    return url;
  },

  // Override how model names are translated to URL Entity Paths
  pathForType: function(type) {
    switch(type) {
      case "datastream":
      return "Datastreams";
      case "location":
      return "Locations";
      case "observation":
      return "Observations";
      case "sensor":
      return "Sensors";
      case "thing":
      return "Things";
      default:
      Ember.Logger.warn("Unknown path: " + type);
      return null;
    }
  }
});
