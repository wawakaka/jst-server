'use strict';

module.exports = function(sequelize, DataTypes) {

  var Kegiatan = sequelize.define(
      'kegiatan',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        sesi: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        materi: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        keterangan: DataTypes.STRING,
      },
      {
        freezeTableName: true,
        tableName: 'kegiatan',
        underscored: true,
      }
  );

  Kegiatan.associate = function(models) {
    Kegiatan.belongsTo(models.jadwal_kelas);
  };

  return Kegiatan;
};