'use strict';
module.exports = function(sequelize, DataTypes) {

  var Bidang = sequelize.define('Bidang', {
    namaBidang: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
  });

  Bidang.associate = function(models) {
    Bidang.hasMany(models.Kelas);
  };

  return Bidang;
};