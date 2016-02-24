'use strict';

var _          = require('lodash');
var init       = require('./lib/init');
var path       = require('path');
var colors     = require('colors/safe');
var requireAll = require('require-all');

// Core and custom services paths
var srvPaths = {
  core: path.resolve(__dirname, './services'),
  custom: path.resolve(__dirname, '../services')
};


// Get service candidates
var candidates = _.assign({}, requireAll(srvPaths.core, srvPaths.custom));


// Load services
var services =_.reduce(candidates, init.validate, [])
               .map(init.process)
               .reduce(init.queue, []);


// Run init scripts
init.run(services).then(function(gota){

  // XXX
  //console.log('GOTA DUMP', gota);

  // "BUILDING A CLOUD TOGETHER" - OUR CLOUD

  // Say hello!
  //console.log(' ');
  //console.log('---------------------------------------------');
  console.log(' ');
  console.log(' ');
  console.log(colors.cyan('   ,'));
  console.log(colors.cyan('   A'));
  console.log(colors.cyan('  d8b   '), 'G O');
  console.log(colors.cyan(' d888b  '), 'T A ', colors.grey('I S  R U N N I N G '));
  console.log(colors.cyan(" `d8b´  "));
  //console.log(' ', colors.cyan('   ,'));
  //console.log(' ', colors.cyan('   A'));
  //console.log(' ', colors.cyan('  d8b'));
  //console.log(' ', colors.cyan(' d888b '), '  G O - T A ', colors.grey('  S E R V E R'));
  //console.log(' ', colors.cyan(" `d8b´"));
  console.log(' ');
  console.log(' ');
  console.log(' ');

  //console.log('\n[DUMP]', _services);
}).catch(function(e){
  console.error(e);
  console.log(e.stack);
});
