'use strict';

var Sequelize = require('sequelize');

module.exports = function*(gota){

  var connection = new Sequelize(
    this.config.name,
    this.config.username,
    this.config.password,
    this.config.options
  );

  return {
    connection: connection,
    orm:        Sequelize
  }
};