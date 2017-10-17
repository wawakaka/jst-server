'use strict';
module.exports = function (sequelize, DataTypes) {
  var Bidang = sequelize.define('Bidang', {
    idBidang: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    namaBidang: DataTypes.STRING
  });
  Bidang.associate = function (models) {
    Bidang.hasMany(models.Kelas);
  }
  return Bidang;
};