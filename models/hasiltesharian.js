'use strict';
module.exports = function(sequelize, DataTypes) {

  var HasilTesHarian = sequelize.define('HasilTesHarian', {
    idTesHarian: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hasil: DataTypes.STRING,
  });

  HasilTesHarian.associate = function(models) {
    HasilTesHarian.belongsTo(models.TesHarian);
    HasilTesHarian.belongsTo(models.Siswa);
  };

  return HasilTesHarian;
};