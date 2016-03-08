import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('datastreams', function() {
    this.route('show', { path: ':datastream_id' });
  });
});

export default Router;
