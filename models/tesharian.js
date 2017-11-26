'use strict';

module.exports = function(sequelize, DataTypes) {

  var TesHarian = sequelize.define(
      'tes_harian',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        file: DataTypes.STRING,
        keterangan: DataTypes.TEXT,
      },
      {
        freezeTableName: true,
        tableName: 'tes_harian',
        underscored: true,
      }
  );

  TesHarian.associate = function(models) {
    TesHarian.hasMany(models.hasil_tes_harian, {as: 'hasil_tes_harian'});
    TesHarian.belongsTo(models.jadwal_kelas);
  };

  return TesHarian;
};