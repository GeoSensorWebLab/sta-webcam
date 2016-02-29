import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    L.Icon.Default.imagePath = "/images";

    var map = L.map(this.get('element.id'), {
      dragging: false,
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false
    }).setView([51.080468, -114.1337777], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    this.set("map", map);

    if (this.get("geojson")) {
      this.updateGeoJSON();
    }

    this.addObserver("geojson", this, "updateGeoJSON");
  },

  updateGeoJSON() {
    var map = this.get("map");
    var layer = L.geoJson(this.get("geojson"));

    map.addLayer(layer);
    map.fitBounds(layer.getBounds(), { padding: [5, 5] });
  }
});
