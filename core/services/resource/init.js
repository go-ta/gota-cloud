'use strict';

var _  = require('lodash');
var co = require('co');

module.exports = function*(gota){

  //console.log('***', this);

  var resourcesRun = yield gota.runlevel.make(
    this.id,
    gota.config.runlevels[this.id],
    {
      log: gota.log,
      store: gota.store,
      plain: 'data',
      test: function(id){
        gota.log('debug', 'This is test running', id);
        return 'This is a test response';
      }
    }
  ).then((child) => {
      //console.log('>>> Init: promise resolved for', this.id);
      return child;
    }).catch(function(err){
      gota.log('error', 'Resource runlevel failed to start');
      gota.log('error', err.stack);
    });

  //resourcesRun.on('message', function(data){
  //  console.log('CORE RUNLEVEL:', data);
  //});
  //resourcesRun.send({fromCore: true});



  //// Get the installed resources
  //var resources = this.loader
  //  .candidates(this.loader.validate)
  //  .map(this.loader.process)
  //  .reduce(this.loader.queue, []);
  //
  //
  //// Build context
  //var ctx = _.assign({}, gota, this);
  //
  //// Setup the resource api
  //var resApi = resources.reduce((_apis, res) => {
  //
  //  var api = this.setup.call(ctx, res);
  //
  //  _apis[res.pkgName] = api;
  //
  //  return _apis;
  //
  //}, {});
  //
  //// XXX
  //console.log();
  //console.log('>>> API', resApi);

  // Setup resources
  //return gota.mkRunl(
  //  this.id,
  //  gota.config.runlevels[this.id],
  //  [{runTimeArgs: true}]
  //).then((child) => {
  //    console.log('>>> Init: promise resolved for', this.id);
  //    return child;
  //  });

  return 'res api';
};