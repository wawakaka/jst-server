'use strict';

module.exports = function(sequelize, DataTypes) {

  var Presensi = sequelize.define(
      'presensi',
      {},
      {
        freezeTableName: true,
        tableName: 'presensi',
        underscored: true,
      }
  );

  return Presensi;
};