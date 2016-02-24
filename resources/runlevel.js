'use strict';

var path = require('path');
var express = require('express');

//var gota = require('../core/lib/runlevels/client');
var gota = require('../core/lib/runlevels/child');





console.log();
console.log('----- RUNNING IN RESOURCES RUNLEVEL ------');
//console.log('-----', process.argv[0]);
//console.log('-----', process.argv[1]);
//console.log('-----', process.argv[2]);
//console.log('-----', gotaEndpoint);
//console.log('-----', Object.keys(process));
console.log();


gota.init(function*(gota){

  var test = yield gota.test('fisse');
  console.log();
  console.log('>>> TEST:', test);
  console.log();

  //gota.log('info', 'FISSE!!!!');

});
//  .then(function(gota){
//
//  console.log('RESRUNL: init done');
//  //console.log('RESRUNL: init done', gota);
//
//  var res = gota.log('kusse').then(function(data){
//    console.log('RESRUNL:', data);
//  });
//
//
//  //console.log('RESRUNL:', gota.config('kusse'));
//
//}).catch(function(err){
//  console.log('RESRUNL:', err);
//  console.error(err.stack);
//});







//
////for(var arg of process.argv[2]){
////  console.log('----- ARG', arg);
////}
//
//if( process.argv[2] ){
//
//  // XXX
//  //console.log('***', express);
//
//  // Messaging
//  //process.send({fromChild: true});
//  //process.send({
//  //  target: '_runl',
//  //  status: 'ready',
//  //  payload: {}
//  //});
//  //process.on('message', function(data){
//  //  console.log('RES RUNLEVEL:', data);
//  //});
//  //
//  ////console.log('>>>', process.cwd());
//  //console.log('>>> RESOURCES', __dirname);
//  //console.log();
//  //console.log('>>>', path.resolve(__dirname, '../../../lib/runlevel'));
//  //var test = require(path.resolve(__dirname, '../../../lib/runlevel'));
//  //console.log('>>>', test);
//
//  //console.log();
//  //console.log('ITERATE:');
//  //var sum = 0;
//  //for(var i=0; i<100^3; i++){
//  //  //console.log('>', i);
//  //  sum += i;
//  //}
//  //console.log();
//  //console.log('>>', sum);
//
//}
//
//
//
//console.log();
//console.log();