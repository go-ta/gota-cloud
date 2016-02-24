
'use strict';

var _       = require('lodash');
var co      = require('co');
var Proxy   = require('harmony-proxy');
var message = require('./message');
var Promise = require('bluebird');

var Facade = function(api){

  //var handler = function(){
  //  return message.send()
  //};

  var walker = function walker(out, value, key){

    if( 'function' === value){
      out[key] = function(){
        return message.send(key, arguments);
      };
    }else if( _.isPlainObject(value) ){
      out[key] = _.reduce(value, walker, {});
    }else{
      out[key] = value;
    }

    return out;
  };

  return _.reduce(api, walker, {});


  //return _.reduce(api, function(targets, value, target){
  //  //console.log('>>> ARGS:', arguments);
  //  targets[target] = (args) => message.send(target, args);
  //  return targets;
  //}, {});
};

module.exports = {
  init: function(runlInitGen){

    // Return a promise
    return co(function*(){

      // Get api string
      var jsonApi = yield message.send('_getApi', {}, 'handshake');
      
      // XXX
      //console.log('\n>>> jsonApi', jsonApi);

      // Build facade
      var facade = Facade(jsonApi);

      // XXX
      //console.log('>>> facade:', facade);

      // Invoke runlevel init generator
      yield runlInitGen.call({}, facade);

      // Runlevel is ready
      yield message.send('_run', {}, 'ready');

    });
  }
};