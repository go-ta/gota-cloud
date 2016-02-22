'use strict';

var fs            = require('fs');
var path          = require('path');
var child_process = require('child_process');

module.exports = {
  resource: {
    path: './lib/runlevel.js',
    args: [1],
    options: {
      uid: 1
    }
  }
};