'use strict';

var Sequelize = require('sequelize');

module.exports = function*(gota){

  return new Sequelize(
    this.config.name,
    this.config.username,
    this.config.password,
    this.config.options
  );
};