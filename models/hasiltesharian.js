'use strict';

module.exports = function(sequelize, DataTypes) {

  var HasilTesHarian = sequelize.define(
      'hasil_tes_harian',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        hasil: DataTypes.STRING,
      },
      {
        freezeTableName: true,
        tableName: 'hasil_tes_harian',
        underscored: true,
      }
  );

  HasilTesHarian.associate = function(models) {
    HasilTesHarian.belongsTo(models.tes_harian);
    HasilTesHarian.belongsTo(models.siswa);
  };

  return HasilTesHarian;
};