"use strict";

var _ = require('lodash');

var relations = {
  "nn": function(inst, rel){
    // TODO
    //inst.belongsToMany(rel);
  },
  "n1": function(){},
  "1n": function(){},
  "11": function(){},
  "10": function(){},
  "0n": function(){}
};

module.exports = {
  define: function(params){

    console.log();
    console.log('+++ name', params.name);
    console.log('+++ model', params.model);
    console.log('+++ relations', params.relations);

    //console.log('@@@', Object.keys(this.db));

    // Create model instance
    var Instance = this.db.connection.define(params.name, params.model);

    // Register relations
    params.relations.forEach((relation) => {

      var type = _.values(relation.count).join('');

      //console.log('===', type);

      relations[type](Instance, relation.pkgName);

    });

  }
};