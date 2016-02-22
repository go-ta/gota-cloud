'use strict';

var _ = require('lodash');

module.exports = function(resource){

  //console.log('### apis', apis);
  //console.log('### res', resource.pkgName);
  //console.log('### models', this.models);
  //console.log('### this', Object.keys(this));
  //console.log('###', arguments);
  //
  //apis[resource.pkgName] = {
  //  fetch: function(){},
  //  create: function(){},
  //  update: function(){},
  //  remove: function(){}
  //};
  //
  //return apis;


  var store = this.store.create({
    name:      resource.pkgName,
    model:     this.models.resource,
    relations: resource.definition.relations
  });

  var res = {
    schema: function(){
      return resource.definition.schema;
    }

  };

  // Done
  return _.assign(res, store);

};