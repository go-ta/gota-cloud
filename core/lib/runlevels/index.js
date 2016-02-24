
'use strict';

var path          = require('path');
var child_process = require('child_process');
var runlevels = {};

module.exports = {

  create: function(name, config, args){
    //console.log('>>>', name, this.config.runlevels);

    //var config = this.config.runlevels[name];

    //console.log('Runlevel create config', config);

    return runlevels[name] = child_process.fork(
      path.resolve(__dirname, '../services/', name, config.path),
      config.args,
      config.options
    );
  },

  fetch: function(name){
    return runlevels[name];
  },

  remove: function(name){
    // TODO
    console.error('TODO');
  },

  '_parse': function(message){

    // XXX
    console.log('>>> Parse:', message);

    if( !message.target || !'_parse' === message.target)
      return message;

    return message;
  },

  '_status': {

  }
};