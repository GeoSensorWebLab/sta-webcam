import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    var props = this.get("properties");
    var items = Object.keys(props).map(function(key) {
      return {
        key: key,
        value: JSON.stringify(props[key], null, "  ")
      };
    });

    this.set("items", items);
    this._super.apply(this, arguments);
  }
});
