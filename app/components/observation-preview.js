import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this.$("button[data-target=feature]").on("click", () => {
      this.$(".result-preview").hide();
      this.$(".feature-preview").show();
      // Toggle visibility of special elements in feature preview
      this.$(".feature-preview *").trigger("isVisible");
    });

    this.$("button[data-target=result]").on("click", () => {
      this.$(".feature-preview").hide();
      this.$(".result-preview").show();
    });
  }
});
