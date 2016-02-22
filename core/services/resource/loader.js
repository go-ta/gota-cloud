'use strict';

var _          = require('lodash');
var co         = require('co');
var path       = require('path');
var semver     = require('semver');
var DepGraph   = require('dependency-graph').DepGraph;
var requireAll = require('require-all');

// Loader utilities
var util = {

  // Dependency graph
  graph: new DepGraph(),


  // Validation
  validate: {
    deps: function(relation){

      // Get related resource
      var relResource = _.find(this, {pkgName: relation.pkgName});

      // Is related resource installed?
      if( !relResource ) return false;

      // Compatible version?
      return semver.satisfies(
        relation.version,
        relResource.definition.version
      );
    }
  },

  // Relations
  relations: {
    addRels: function(resource){

      // Add resource relations to dep graph
      resource.definition.relations
        .map(function(rel){
          return rel.pkgName;
        })
        .forEach(util.graph.addDependency.bind(
          util.graph,
          resource.pkgName
        ));

    },
    rmRes: function(resource){
      util.graph.dependantsOf(resource.pkgName)
        .forEach(util.graph.removeNode);
      util.graph.removeNode(resource.pkgName);
    }
  }
};

// Resource loader
module.exports = {

  candidates: function(validator, level){

    var resPaths = {
      core: path.resolve(__dirname, '../../resources')
    };

    // Load and validate
    return _.reduce(requireAll(resPaths.core), validator, []);

    // Get candidates
    //return requireAll(resPaths.core);
  },

  validate: function(valids, candidate, pkgName){

    // Must have a definition file
    if( !('definition' in candidate) )
      return valids;

    // Add node to dep graph
    util.graph.addNode(pkgName);

    // Register valid service
    valids.push(_.assign(candidate, {pkgName: pkgName}));

    return valids;
  },

  process: function(resource, index, resources){

    // Shorthand
    var relations = resource.definition.relations;

    // Default status
    var status = {
      activable: true,
      active: false
    };

    // Have relations?
    if( _.isEmpty(relations) )
      return _.assign(resource, status);

    // Are relations installed?
    status.activable = relations.every(util.validate.deps.bind(resources));

    // Update dependency graph
    if( status.activable ){
      util.relations.addRels(resource);
    }else{
      util.relations.rmRes(resource);
    }

    // Update resource
    return _.assign(resource, status);
  },

  queue: function(queue, resource){

    // Get init index of service init
    var _index = util.graph.overallOrder().indexOf(resource.pkgName);

    // Insert in queue
    queue[_index] = resource;

    return queue;
  }

};