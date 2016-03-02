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

    // If this element is invisible when added to the DOM and then made visible,
    // then we have to update the map. Do this by triggering "isVisible" on the
    // element by whoever is controlling visibility.
    this.$(this.get("element")).bind('isVisible', () => {
      map.invalidateSize();
      this.updateGeoJSON();
    });

    this.addObserver("geojson", this, "updateGeoJSON");
  },

  updateGeoJSON() {
    var map = this.get("map");

    if (this.get("layer")) {
      map.removeLayer(this.get("layer"));
    }

    if (this.get("geojson")) {
      var layer = L.geoJson(this.get("geojson"));

      map.addLayer(layer);
      map.fitBounds(layer.getBounds(), { padding: [5, 5] });
      this.set("layer", layer);
    }
  }
});
