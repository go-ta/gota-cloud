
'use strict';

var _       = require('lodash');
var co      = require('co');
var cp      = require('child_process');
var path    = require('path');
var Proxy   = require('harmony-proxy');
var message = require('./message');
var Promise = require('bluebird');

// Runlevels store
var runlevels = {};

var apis = {};

var targets = {
  '_getApi': function(message){
    return {
      id: message.id,
      data: apis[this.runlId]
      //data: Object.keys(apis[this.runlId]).reduce((out, prop) => {
      //  out[prop] = typeof apis[this.runlId][prop];
      //  return out;
      //}, {})
    };
  },
  '_run': function(message){
    return {
      id: message.id
    }
  }
};

module.exports = {
  make: function(runlId, config, api){

    // XXX
    //console.log('>>> API:', api);

    // Store api
    apis[runlId] = this.inspect(api);

    return new Promise((resolve, reject) => {

      // Fork a child process
      var child = runlevels[runlId] = cp.fork(
          path.resolve(__dirname, '../services/', runlId, config.path),
          config.args,
          config.options
        );

      // Listen for startup completion
      child.on('message', (message) => {

        // XXX
        console.log('GOTA: got message:', message);

        // Listen for ready status
        if(message.status && message.target
          && 'ready' === message.status
          && '_run'  === message.target
        ){
          child.send(targets['_run'](message));
          resolve(child);
        }else{
          child.send(this.parse(runlId, api, message));
        }
      });

      // Abort if it takes too long
      setTimeout(() => {
        reject(new Error('Runlevel ' + runlId + ' failed to start!'));
      }, 5 * 1000);

    });
  },

  inspect: function(api){

    function walker(out, value, key){

      if( _.isPlainObject(value) )
        out[key] = _.reduce(value, walker, {});
      else if( _.isFunction(value) )
        out[key] = typeof value;
      else
        out[key] = value;

      return out;
    }

    return _.reduce(api, walker, {});
  },

  // Parse incoming messages
  parse: function(runlId, api, message){

    // XXX
    //console.log('>>> Parse:', message);

    // Check for internal message
    if( message.target in targets ){
      return targets[message.target].call({runlId: runlId}, message);
    }

    // Lookup in
    //var api = apis[runlId];
    //console.log('>>> Api:', api);
    if( message.target in api ){
      return {
        id: message.id,
        data: _.get(api, message.target)(message.data)
      };
    }

    return {
      id: message.id,
      data: null
    };
  }
};