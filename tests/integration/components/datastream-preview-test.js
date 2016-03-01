import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('datastream-preview', 'Integration | Component | datastream preview', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{datastream-preview}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#datastream-preview}}
      template block text
    {{/datastream-preview}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
