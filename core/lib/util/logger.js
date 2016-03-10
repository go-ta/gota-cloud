/**************************************************************************
 *
 *      Simple Logger for SmallCloud
 *
 **************************************************************************/

//var winston = require('winston');
//var config  = require('../../config/logger.js');
//
//TODO: log to database transport
//
//
//var logger = new (winston.Logger)({
//  levels: {
//    trace: 0,
//    input: 1,
//    verbose: 2,
//    prompt: 3,
//    debug: 4,
//    info: 5,
//    data: 6,
//    help: 7,
//    warn: 8,
//    error: 9
//  },
//  colors: {
//    trace: 'magenta',
//    input: 'grey',
//    verbose: 'cyan',
//    prompt: 'grey',
//    debug: 'blue',
//    info: 'green',
//    data: 'grey',
//    help: 'cyan',
//    warn: 'yellow',
//    error: 'red'
//  }
//});
//
//logger.add(winston.transports.Console, config.console);
//
//modeule.exports = logger;

var colors = require('colors/safe');
var Color  = require('Color');
var _      = require('lodash');

var levels = {
  trace:    colors.purple,
  input:    colors.grey,
  //verbose:  colors.cyan,
  prompt:   colors.grey,
  debug:    colors.grey,
  info:     colors.cyan,
  data:     colors.grey,
  help:     colors.cyan,
  warn:     colors.yellow,
  error:    colors.red
};

module.exports = function(level, message){

  var color = levels[level];

  console.log('', color(_.padRight(level, 6)), message)
  //console.log('', color(_.padRight(level, 7)), message)
};



