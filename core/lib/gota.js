
'use strict';

var _          = require('lodash');
var co         = require('co');
var path       = require('path');
var logger     = require('./util/logger.js');
var express    = require('express');
var requireAll = require('require-all');

// Core config
var configPaths = {
  //core: path.resolve(__dirname, '../../confg'),
  custom: path.resolve(__dirname, '../../config')
};


// Core utilities
var util = {

  // Config loader
  config: function(){

    var _config = requireAll(configPaths.custom);

    return _config;
  },

  // Component registration
  reg: {
    srv: function(srv){
      srv.forEach(function(_srv){
        store.srv[_srv.id] = _srv;
        store.reg[_srv.id] = Object.keys(_srv.manifest.dependencies);
      });
    },
    api: function(srv, api){
      store.api[srv.id] = api;
    }
  }
};


// Core store
var store = {
  api: {},
  srv: {},
  reg: {},
  core: {
    log: logger,
    http: express(),
    config: util.config()
  }
};


// Core object
var gota = {

  core: store.core,

  reg: function(type, srv, api){
    util.reg[type](srv, api);
  },

  ctx: function gotaCtx(srvId, withCore){

    // Obtain registered apis
    var apis = _.reduce(store.reg[srvId], function(out, _srvId){
      out[_srvId] = store.api[_srvId];
      return out;
    }, {});

    return _.assign({}, store.core, apis);
  },

  thener: function(i, api){

    // Register defined api
    if( api ) this.reg('api', this.services[i - 1], api);

    // More services to initialize?
    if( i < this.services.length ){

      try{ // Invoke init runner
        this.runner(i);
      }catch(e){
        this.reject(e)
      }
    }else{

      // Done!
      console.log(' ');
      this.core.log('info', 'Go-ta is ready');
      this.resolve(gota);
    }
  },

  runner: function(i){

    // Defaults
    i = i || 0;

    // Grow context
    _.assign(this, gota);

    // Info log
    this.core.log('info', 'Starting ' + this.services[i].id + '...');

    // Run generator
    co(this.services[i].init.bind(
      _.omit(this.services[i], ['init', 'manifest', 'active', 'activable']),
      this.ctx(this.services[i].id, true)
    )).then(this.thener.bind(this, i + 1))
      .catch(this.reject);
  }
};

// Export
module.exports = gota;