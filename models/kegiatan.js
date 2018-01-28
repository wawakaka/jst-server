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
        sesi_mulai: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        sesi_selesai: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        materi: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        keterangan: DataTypes.TEXT,
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