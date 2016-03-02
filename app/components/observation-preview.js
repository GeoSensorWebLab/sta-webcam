import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this.$("button[data-target=feature]").on("click", () => {
      if (this.$(".feature-preview").filter(":visible").size() === 0) {
        this.$(".result-preview").hide();
        this.$(".feature-preview").show();
        // Toggle visibility of special elements in feature preview
        this.$(".feature-preview > div").trigger("isVisible");

        this.$("li").toggleClass("active");
      }
    });

    this.$("button[data-target=result]").on("click", () => {
      if (this.$(".result-preview").filter(":visible").size() === 0) {
        this.$(".feature-preview").hide();
        this.$(".result-preview").show();

        this.$("li").toggleClass("active");
      }
    });
  }
});
