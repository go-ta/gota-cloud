'use strict';

//var fs            = require('fs');
var path          = require('path');
//var child_process = require('child_process');

module.exports = {
  resource: {
    path: path.resolve(__dirname, '../resources/runlevel.js'),
    args: ['uno'],
    options: {
      //cwd: path.resolve(__dirname, '../resources')
      //execPath: path.resolve(__dirname, '../services/resource/lib/runlevel.js')
      //uid: 1
    }
  }
};