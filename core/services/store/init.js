"use strict";

var _ = require('lodash');

// Local registry
var stores = {};


module.exports = function*(gota){

  //console.log('### gota', Object.keys(gota));
  //console.log('### this', Object.keys(this));

  // Setup
  var that = this;

  var api = {

    // Create a new data store
    create: function(params){

      //console.log();
      //console.log('&&& name', params.name);
      //console.log('&&& model', params.model);
      //console.log('&&& relations', params.relations);

      // Relational or non relational?
      if(_.isArray(params.relations))
        stores[params.name] = that.lib.sql.define.call(_.assign({}, gota, that), params);


      // Done
      //return store.then(that.lib.facade);

      // XXX
      return {
        fetch: function(){},
        create: function(){},
        update: function(){},
        remove: function(){}
      };
    },

    // Get a previously created store by name
    fetch: function(storeName){
      return stores[storeName];
    }
  };

  return api;
};