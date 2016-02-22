'use strict';

var _  = require('lodash');
var co = require('co');

module.exports = function*(gota){

  // Get the installed resources
  var resources = this.loader
    .candidates(this.loader.validate)
    .map(this.loader.process)
    .reduce(this.loader.queue, []);

  // Build context
  var ctx = _.assign({}, _.pick(gota, ['store', 'policies', 'log']));

  // Setup resources
  return yield resources.map(this.setup.bind(ctx));
};