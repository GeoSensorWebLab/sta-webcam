import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    if (this.get("entity")) {
      this.updateAttributes();
    }

    this.addObserver("entity", this, "updateAttributes");
    this._super.apply(this, arguments);
  },

  updateAttributes() {
    var attributesString = this.get("attributes");
    var entity = this.get("entity");
    var attrs = attributesString.split(",").map(function(item) {
      return {
        key: item,
        value: JSON.stringify(entity.get(item), null, "  ")
      };
    });

    this.set("attribute-list", attrs);
  }
});
