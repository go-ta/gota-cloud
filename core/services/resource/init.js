'use strict';

var _  = require('lodash');
var co = require('co');

module.exports = function*(gota){

  //console.log('***', this);

  var resourcesRun = gota.mkRunl(this.id, [{runTimeArgs: true}]);

  resourcesRun.on('message', function(data){
    console.log('CORE RUNLEVEL:', data);
  });
  resourcesRun.send({fromCore: true});

  // Get the installed resources
  var resources = this.loader
    .candidates(this.loader.validate)
    .map(this.loader.process)
    .reduce(this.loader.queue, []);


  // Build context
  var ctx = _.assign({}, gota, this);

  // Setup the resource api
  var resApi = resources.reduce((_apis, res) => {

    var api = this.setup.call(ctx, res);

    _apis[res.pkgName] = api;

    return _apis;

  }, {});

  // XXX
  console.log();
  console.log('>>> API', resApi);

  // Setup resources
  return resApi;
};