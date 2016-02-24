
'use strict';

var _       = require('lodash');
var Promise = require('bluebird');

var _messages = {};


module.exports = {
  send: function(target, data, status){

    return new Promise(function(resolve, reject){

      // Set a random id
      var msgId = Math.floor(Date.now() / Math.random());

      // Send the message
      process.send({
        id:     msgId,
        status: status,
        target: target,
        data:   data
      });

      // Wait for response
      process.on('message', function(message){

        // XXX
        console.log('RESPONSE:', message);

        if( msgId === message.id && null === message.data){
          reject(new Error('Invalid response for message ' + msgId));
          return;
        }

        // Resolve
        if( msgId === message.id){
          resolve(message.data);
        }
      });

      // Abort on timeout
      setTimeout(() => {
        reject(new Error('No response for message ' + msgId));
      }, 3 * 1000);

    });
  }
};