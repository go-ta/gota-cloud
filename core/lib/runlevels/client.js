//
//'use strict';
//
//var _       = require('lodash');
//var co      = require('co');
//var Proxy   = require('harmony-proxy');
//var message = require('./message');
//var Promise = require('bluebird');
//
//var _target = {};
//
//var _endpoints = {
//  fetch: function(){},
//  create: function(){},
//  update: function(){},
//  remove: function(){},
//  describe: function(){}
//};
//
//
//module.exports = {
//  init: function endpointInit(){
//
//    return co(function*(){
//
//      // Get api map from the other endpoint
//      var apiMap = yield message.send('_getApi', {}, 'handshake');
//
//      // XXX
//      console.log('CLIENT:', apiMap);
//
//      // Setup handlers
//      var target = _.reduce(apiMap, function(targets, type, name){
//        targets[name] = function(args){
//          return message.send(name, args);
//        };
//        return targets
//      }, {});
//
//      // Message runlevel ready
//      yield message.send('_run', {}, 'ready');
//
//      return target;
//
//
//      //// Setup the proxy
//      //return new Proxy(target, {
//      //  get: function(target, name){
//      //
//      //    console.log('>>> TARGET', target);
//      //    console.log('>>> NAME', name);
//      //    //console.log('>>> VALUE', value);
//      //
//      //    //return target[name]('notKusse');
//      //
//      //    //if( name in target ){
//      //    //  //message.send(name, )
//      //    //}
//      //
//      //    return 'fisse';
//      //  }
//      //});
//  });
//
//    //return new Promise(function(resolve, reject){
//    //
//    //  // Get a map of the available api
//    //
//    //
//    //
//    //
//    //
//    //  // Resolve the promise
//    //  resolve(proxy);
//    //
//    //});
//  }
//};