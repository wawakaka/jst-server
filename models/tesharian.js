'use strict';

module.exports = function(sequelize, DataTypes) {

  var TesHarian = sequelize.define('TesHarian', {
    idTes: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    keterangan: DataTypes.TEXT,
  });

  TesHarian.associate = function(models) {
    TesHarian.hasMany(models.HasilTesHarian, {as: 'hasilTesHarian'});
    TesHarian.belongsTo(models.JadwalKelas);
  };

  return TesHarian;
};