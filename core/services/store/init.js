"use strict";

var _ = require('lodash');


module.exports = function*(gota){

  //console.log('### gota', Object.keys(gota));
  //console.log('### this', Object.keys(this));

  // Setup
  var that = this;

  var api = {

    // Create a new data store
    create: function(params){

      //console.log();
      //console.log('+++ name', params.name);
      //console.log('+++ model', params.model);
      //console.log('+++ relations', params.relations);

      // Setup
      var store;

      // Relational or non relational?
      if(_.isArray(params.relations))
        store = that.lib.sql.define.call(_.assign({}, gota, that), params);



      return {
        fetch: function(){},
        create: function(){},
        update: function(){},
        remove: function(){}
      };

    }
  };

  return api;
};